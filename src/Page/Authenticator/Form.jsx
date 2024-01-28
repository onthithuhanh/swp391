import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
const FormStart = () => {
  const [form] = Form.useForm();
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        // maxWidth: 600,
      }}
      autoComplete="off"
      initialValues={{
        items: [{}],
      }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`Mục I.${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, 'name']}>
                  <Input />

                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, '1']}>
                              <Input placeholder="Nội dung" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '2']}>
                              <Input placeholder="Dài" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '3']}>
                              <Input placeholder="Rộng" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '4']}>
                              <Input placeholder="Diện tích" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '5']}>
                              <Input placeholder="Hệ sô" />
                            </Form.Item>

                            <Form.Item noStyle name={[subField.name, '6']}>
                              <Input placeholder="Ghi chú" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Thêm dữ liệu
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Thêm mục
            </Button>
          </div>
        )}
      </Form.List>



      <Form.List name="Thiet">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`Mục II.${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, 'name']}>
                  <Input />

                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, '1']}>
                              <Input placeholder="Phần thiết kế" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '2']}>
                              <Input placeholder="Tổng" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, '3']}>
                              <Input placeholder="Ghi chú" />
                            </Form.Item>

                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Thêm dữ liệu
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Thêm mục
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 5)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};
export default FormStart;