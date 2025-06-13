import {
  Col,
  Row,
  Typography,
  Card,
  List,
  Skeleton,
  Empty,
  FloatButton,
  Drawer,
  Form,
  Input,
  Button,
  notification 
} from "antd";
import { getData, sendData } from "../../utils/api";
import { useState, useEffect } from "react";
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Meta } = Card;

const Gallery = () => {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification(); 

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description,
    });
  };

  useEffect(() => {
    getDataGallery();
  }, []);

  const getDataGallery = async () => {
    try {
      const resp = await getData("/api/v1/natures");
      if (resp) {
        setDataSources(resp);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const onOpenDrawer = () => setIsOpenDrawer(true);
  const onCloseDrawer = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsOpenDrawer(false);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  const handleDrawerEdit = (record) => {
    setIsOpenDrawer(true)
    setIsEdit(true)
    setIdSelected(record ?.id)

    form.setFieldValue("name_natures", record?.name_natures)
    form.setFieldValue("description", record?.description)
  }

  const handleSubmit = () => {
    let nameNatures = form.getFieldValue("name_natures");
    let descriptionNatures = form.getFieldValue("description_natures");

    let url = isEdit ? `/api/v1/natures/${idSelected}` : "/api/v1/natures";
    let msg = isEdit ? "Sukses memperbarui data" : "Sukses menambahkan data";

    let formData = new FormData();
    formData.append("name_natures", nameNatures);
    formData.append("description", descriptionNatures);

    sendData(url, formData)
      .then((resp) => {
        if (resp?.datas) {
          openNotificationWithIcon("success", "Data Berhasil dikirim", msg);
          form.resetFields();
          getDataGallery(); // refresh data
          onCloseDrawer();
        } else {
          openNotificationWithIcon("error", "Data natures", "Gagal disimpan");
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon("error", "Error", "Terjadi kesalahan saat mengirim data");
      });
  };

  const renderDrawer = () => (
    <Drawer
      title="Form Natures"
      onClose={onCloseDrawer}
      open={isOpenDrawer}
      extra={
        <Button type="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name of Natures"
          name="name_natures"
          rules={[{ required: true, message: "Must be filled" }]}
        >
          <Input placeholder="e.g. Mountain" />
        </Form.Item>
        <Form.Item
          label="Description of Natures"
          name="description_natures"
        >
          <Input.TextArea rows={3} placeholder="e.g. Description of natures" />
        </Form.Item>
      </Form>
    </Drawer>
  );

  return (
    <div className="layout-content">
      {contextHolder} 
      <FloatButton
        type="primary"
        style={{ insetInlineEnd: 24, bottom: 24 }}
        icon={<PlusOutlined />}
        onClick={onOpenDrawer}
      />

      {renderDrawer()}

      <Row gutter={[24, 0]}>
        <Col xs={23} className="mb-24">
          <Card bordered={false} className="circlebox h-full w-full">
            <Title>Natures Gallery</Title>
            <Text style={{ fontSize: "12pt" }}>
              Browse through beautiful nature photos.
            </Text>

            {loading ? (
              <List
                grid={{ gutter: 16, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
                dataSource={[1, 2, 3, 4]}
                renderItem={(item) => (
                  <List.Item key={item}>
                    <Card hoverable>
                      <Skeleton
                        active
                        avatar
                        paragraph={{ rows: 2 }}
                        loading={loading}
                        title={false}
                      >
                        <div>
                          <Skeleton.Image className="skeleton-image" />
                        </div>
                      </Skeleton>
                    </Card>
                  </List.Item>
                )}
              />
            ) : dataSources.length === 0 ? (
              <Empty description="No nature items found." style={{ marginTop: 20 }} />
            ) : (
              <List
                grid={{ gutter: 16, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
                dataSource={dataSources}
                renderItem={(item) => (
                  <List.Item key={item.id || item.name_natures}>
                    <Card
                      hoverable
                      cover={<img alt={item.name_natures} src={item.url_photo} />}
                    actions={[
                      <EditOutlined key={item?.id} onClick ={()=> handleDrawerEdit(item)} />,
                      <SearchOutlined key={item?.id} />,
                      <DeleteOutlined key={item?.id} />,
                    ]}
                    >
                      <Meta
                        title={item.name_natures}
                        description={item.description}
                      />
                     
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Gallery;
