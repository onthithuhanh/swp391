
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table, Tooltip, notification } from 'antd';
import moment from 'moment/moment';
import { MoreOutlined } from '@ant-design/icons';
import ComSearch from '../Components/ComSearch/ComSearch';
import ComButton from '../Components/ComButton/ComButton';
import ComHeader from '../Components/ComHeader/ComHeader';

export default function Search({ activeTab }) {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpenProcessing, setIsModalOpenProcessing] = useState(false);
  const [isModalOpenCanceled, setIsModalOpenCanceled] = useState(false);
  const [isModalOpenProcessingS, setIsModalOpenProcessingS] = useState(false);
  const [isModalOpenCanceledS, setIsModalOpenCanceledS] = useState(false);
  const [dataRun, setDataRun] = useState(false);
  const [orderRequestDefault, setOrderRequestDefault] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [selectedMaterials, setSelectedMaterials] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [selected, setSelected] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      setSelected(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const showModalEdit = (e) => {
    setOrderRequestDefault({
      id: e._id
    })
    setIsModalOpenProcessing(true);

  };

  const handleOpenCanceled = (e) => {

    setOrderRequestDefault({
      id: e._id
    })
    setIsModalOpenCanceled(true);

  };
  const handleCancelCanceled = () => {
    setIsModalOpenCanceled(false);

  };
  const handleCancelProcessing = () => {
    setIsModalOpenProcessing(false);

  };
  const handleCancelCanceledS = () => {
    setIsModalOpenCanceledS(false);

  };
  const handleCancelProcessingS = () => {
    setIsModalOpenProcessingS(false);

  };
  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    return number
    // .toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'VND',
    // });
  }
  useEffect(() => {
    if (selected.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [selected]);
  const processing = () => {

    setDataRun(!dataRun);
    handleCancelProcessing()
  }

  const sttCanceled = () => {

    setDataRun(!dataRun);
    handleCancelCanceled()
  }

  const processingS = () => {

    setDisabled(true)

    setDataRun(!dataRun);
    handleCancelProcessingS()
  }

  const canceledS = () => {

    setDisabled(true)
    setDataRun(!dataRun);
    handleCancelCanceledS()
  }
  useEffect(() => {
    setTimeout(() => {


    }, 100);
  }, [dataRun, activeTab]);


  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <ComButton
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            <div className='justify-center flex '><SearchOutlined />Tìm kiếm</div>
          </ComButton>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Mã Báo Giá',
      dataIndex: '_id',
      width: 70,
      key: '_id',
      fixed: 'left',
      render: (_, record) => (
        <div >
          <h1>{record._id}</h1>
        </div>
      ),
    },
    {
      title: 'Tên Khách Hàng',
      width: 100,
      dataIndex: 'name',
      key: 'name',

    },
    {
      title: 'Tên Dự Án ',
      width: 100,
      dataIndex: 'NameProject',
      key: 'NameProject',

    },
    {
      title: 'Trạng Thái ',
      width: 70,
      dataIndex: 'Status',
      key: 'Status',

    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      width: 80,
      key: 'createdAt',
      render: (_, record) => (
        <div className="text-sm text-gray-700 line-clamp-4">
          <p>{moment(record.createdAt).format('l')}</p>
        </div>
      ),
    },
    {
      title: <MoreOutlined />,
      width: 70,
      render: (_, record) => (
        <div className="text-sm text-gray-700 line-clamp-4">
          <p>Chi Tiết</p>
        </div>
      ),
    },
  ];
  let abc = [
    {
      _id: '1',
      name: 'Nguyễn Bá Vương',
      NameProject: 'Nhà ở',
      Status: 'đang nhập',
      createdAt: "2024-01-01T16:33:41.418+00:00",

    },
    {
      _id: '1',
      name: 'Nguyễn Bá Vương',
      NameProject: 'Nhà ở',
      Status: 'đang nhập',
      createdAt: "2024-01-01T16:33:41.418+00:00",

    },
    {
      _id: '1',
      name: 'Nguyễn Bá Vương',
      NameProject: 'Nhà ở',
      Status: 'đang nhập',
      createdAt: "2024-01-01T16:33:41.418+00:00",

    },
  ]

  return (
    <>
      {contextHolder}
      <ComHeader/>
      <div className='flex p-2 justify-center'>
        <ComSearch />
      </div>
      <div className='flex p-2 justify-center'>
        <div className=' w-11/12'>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey="_id"
            columns={columns}
            dataSource={abc}
            scroll={{
              x: 1520,
              y: "55vh",
            }}
            bordered
            pagination={{
              showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
              pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
            }}
          />
        </div>
      </div>


      <Modal title="Chấp nhận đơn hàng này"
        okType="primary text-black border-gray-700"
        open={isModalOpenProcessing}
        width={500}
        // style={{ top: 20 }}
        onCancel={handleCancelProcessing}>
        <div className='text-lg p-6'>Bạn có chắc chắn muốn chuyển qua đang sử lý hay không?</div>
        <div className='flex'>
          <ComButton
            type="primary"
            danger
            onClick={processing}
          >
            xác nhận
          </ComButton>
          <ComButton
            type="primary"
            onClick={handleCancelProcessing}
          >
            hủy
          </ComButton>
        </div>
      </Modal>
      <Modal title="Xác nhận hủy"
        okType="primary text-black border-gray-700"
        open={isModalOpenCanceled}
        width={500}
        // style={{ top: 20 }}
        onCancel={handleCancelCanceled}>
        <div className='text-lg p-6'>Bạn có chắc chắn muốn hủy đơn hàng này.</div>
        <div className='flex'>
          <ComButton
            type="primary"
            danger
            onClick={sttCanceled}
          >
            Xác nhận
          </ComButton>
          <ComButton
            type="primary"
            onClick={handleCancelCanceled}
          >
            Hủy
          </ComButton>
        </div>
      </Modal>

      <Modal title="Chấp nhận đơn hàng"
        okType="primary text-black border-gray-700"
        open={isModalOpenProcessingS}
        width={500}
        // style={{ top: 20 }}
        onCancel={handleCancelProcessingS}>
        <div className='text-lg p-6'>Bạn có chắc chắn muốn chuyển qua đang sử lý hay không?</div>

        <div className='flex'>
          <ComButton
            type="primary"
            danger
            onClick={processingS}
          >
            xác nhận
          </ComButton>
          <ComButton
            type="primary"
            onClick={handleCancelProcessingS}
          >
            hủy
          </ComButton>
        </div>
      </Modal>
      <Modal title="Xác nhận hủy đơn hàng"
        okType="primary text-black border-gray-700"
        open={isModalOpenCanceledS}
        width={500}
        // style={{ top: 20 }}
        onCancel={handleCancelCanceledS}>
        <div className='text-lg p-6'>Bạn có chắc chắn muốn hủy đơn hàng đã chọn này không?</div>

        <div className='flex'>
          <ComButton
            type="primary"
            danger
            onClick={canceledS}
          >
            Xác nhận
          </ComButton>
          <ComButton
            type="primary"
            onClick={handleCancelCanceledS}
          >
            Hủy
          </ComButton>
        </div>
      </Modal>
    </>
  )
}
