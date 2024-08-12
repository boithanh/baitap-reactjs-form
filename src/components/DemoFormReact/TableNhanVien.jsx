import React from 'react';
import { Table, Tag } from 'antd';
import ButtonCustom from './ButtonCustom';


const TableNhanVien = ({ data, handleDeleteNhanVien, getInfoNhanVien, filteredNhanVien }) => {
    const columns = [
        {   // Tiêu đề các cột
            title: "MSNV",
            //Giúp xác định thuộc tính sẽ gọi tới để lấy dữ liệu
            dataIndex: "msnv",
            //Định danh cột sử dụng 
            key: "msnv",
            //Quyết định cấu trúc JSX hiển thị lên giao diện, có 3 tham số là text(nội dung của dataIndex lấy về), record đại diện cho phần tử  đang lấy dữ liệu, index (vin trí index của record trong data)
            // render: (text, record) => {
            //     return <button className='bg-red-500'>{text}</button>
            // }
        },
        {
            title: "Họ Tên",
            dataIndex: "hoTen",
            key: "hoTen",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Giới Tính",
            key: "gioiTinh",
            dataIndex: "gioiTinh",
            render: (text, record, index) => {
                return <Tag color={text == "Nam" ? "geekblue" : "Magenta"}>{text}</Tag>;
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record, index) => (
                <>
                    <ButtonCustom content={"Xóa"} bgColor='bg-red-500' onClick={() => {
                        // console.log(record);
                        handleDeleteNhanVien(record.msnv);
                        // resetForm();
                    }} />
                    <ButtonCustom content={"Sửa"} bgColor='bg-purple-500' onClick={() => {
                        getInfoNhanVien(record.msnv);
                    }} />
                </>
            ),
        },
    ];
    return (
        <div>
            <Table dataSource={data} columns={columns} />;
        </div>
    )
}

export default TableNhanVien