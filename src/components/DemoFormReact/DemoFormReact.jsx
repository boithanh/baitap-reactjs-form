import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import InputCustom from "./InputCustom";
import { DatePicker, notification } from "antd";
import ButtonCustom from "./ButtonCustom";
import TableNhanVien from "./TableNhanVien";
import * as yup from 'yup'
import { NotificationContext } from "../../App";

const DemoFormReact = () => {
  const [arrNhanVien, setArrNhanVien] = useState([]);
  const [isDisable, setDisable] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái lưu giá trị tìm kiếm
  const [filteredNhanVien, setFilteredNhanVien] = useState(arrNhanVien); // Trạng thái lưu kết quả lọc

  // handleBlur khi ng dùng bấm con trỏ chuột focus vào input sau đó ko focus
  const { handleSubmit, handleChange, values, setFieldValue, setValues, errors, handleBlur, touched } = useFormik({
    // InintialState là dữ liệu mặc định của formilk được cung cấp từ người dùng
    initialValues: {
      msnv: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      matKhau: "",
      gioiTinh: "",
      ngaySinh: "",

    },
    // onSubmit được thực thi khi form  bắt đầu chạy sự kiện submit, tham số value đại diện cho dữ liệu
    onSubmit: (value, { resetForm }) => {
      // console.log(value);
      // arrNhanVien.push(value);
      // const newArrNhanVien = [...arrNhanVien];
      // setArrNhanVien(newArrNhanVien);
      setArrNhanVien([...arrNhanVien, value]);
      resetForm();

    },
    // yup.object sẽ nhận được 1 object chứa thông tin các validation dành cho các field ở initialize
    validationSchema: yup.object({
      email: yup.string().required("Vui lòng không bỏ trống"),
      // msnv: gồm 4 đến 8 ký tự, không bỏ trống
      // Số điện thoại: Nhập đúng số diện thoại Việt Nam (regex)
      //matkhau: bao gồm ít nhất ký tự đực biệt , ít nhất chữ cái viết hoa và có ít nhất số
      // giới tính: bắt buộc chọn
      //họ tên: Phải là chữ
      msnv: yup.string().required("Vui lòng không được bỏ trống").min(4, "MSNV phải có ít nhất 4 ký tự").max(8, "MSNV phải có ít nhất 8 ký tự"),
      soDienThoai: yup.string().matches(/^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/, "vui lòng nhập đúng số điện thoại Việt"),
      matKhau: yup.string().matches(/^[A-Za-zÀ-ỹ\s]+$/, "Vui lòng tạo mật khẩu có ít nhất một kí tự đặc biệt, 1 chức cái viết hoa và 1 số"),
      hoTen: yup.string().matches(/^[a-zA-Z\s]+$/, "Họ tên phải là chữ"),
      ngaySinh: yup.string().required("Vui lòng chọn ngày sinh"),
      gioiTinh: yup.string().required("Vui lòng chọn giới tính")
    })
  });
  // console.log(errors);
  // console.log(touched);
  const valueContext = useContext(NotificationContext);
  const deleteNhanVien = (msnv) => {
    const newArrNhanVien = [...arrNhanVien];
    const index = newArrNhanVien.findIndex((item, index) => item.msnv == msnv)
    if (index != -1) {
      newArrNhanVien.splice(index, 1)
      setArrNhanVien(newArrNhanVien)

    } else {
      valueContext.handleNotification("error", "Có lỗi xảy ra người dùng không có trong hệ thống")
    }
  }
  const getInfoNhanVien = (msnv) => {
    //Sử dụng phương thức setValue để lấy record và cập nhật lên form
    // Cách 1:
    // setFieldValue('msnv', record.msnv);
    // setFieldValue('hoTen', record.hoTen);
    // setFieldValue('email', record.email);
    // setFieldValue('soDienThoai', record.soDienThoai);
    // setFieldValue('gioiTinh', record.gioiTinh);
    // setFieldValue('ngaySinh', record.ngaySinh);
    // setFieldValue('matKhau', record.matKhau);
    const nhanVien = arrNhanVien.find((item, index) => {
      return item.msnv == msnv
    })
    if (nhanVien) {
      setValues(nhanVien);
      setDisable(true);
    }
  }

  const updateNhanVien = () => {

    let newArrNhanVien = [...arrNhanVien];
    const index = newArrNhanVien.findIndex(nv => nv.msnv === values.msnv);

    if (index !== -1) {
      newArrNhanVien[index] = {
        ...newArrNhanVien[index],
        hoTen: values.hoTen,
        email: values.email,
        soDienThoai: values.soDienThoai,
        ngaySinh: values.ngaySinh,
        gioiTinh: values.gioiTinh,
        matKhau: values.matKhau,
      };
      setArrNhanVien(newArrNhanVien);
    } else {
      alert("Không tìm thấy nhân viên cần cập nhật!");
    }
  }

  const searchNhanVien = (keyWord) => {
    const lowerCaseWord = keyWord.toLowerCase();
    const filter = arrNhanVien.filter((nv) =>
      nv.hoTen.toLowerCase().includes(lowerCaseWord)
    );

    setFilteredNhanVien(filter); // Cập nhật kết quả lọc
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center my-5">Bài tập ứng dụng xây dựng form lấy dữ liệu trong React</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputCustom
            labelContent={"MSNV"}
            placeholder={"Vui lòng nhập msnv"}
            name={"msnv"}
            value={values.msnv}
            onChange={handleChange}
            id={"msnv"}
            error={errors.msnv}
            touched={touched.msnv}
            onBlur={handleBlur}
            disabled={isDisable}
          />
          <InputCustom
            labelContent={"Họ tên"}
            placeholder={"Vui lòng nhập họ tên"}
            name={"hoTen"}
            value={values.hoTen}
            onChange={handleChange}
            id={"hoTen"}
            error={errors.hoTen}
            touched={touched.hoTen}
            onBlur={handleBlur}
          />

          <InputCustom
            labelContent={"Email"}
            placeholder={"Vui lòng nhập email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            id={"email"}
            error={errors.email}
            touched={touched.email}
            onBlur={handleBlur}
          />
          <InputCustom
            labelContent={"Số điện thoại"}
            placeholder={"Vui lòng nhập số điện thoại"}
            name={"soDienThoai"}
            value={values.soDienThoai}
            id={"soDienThoai"}
            error={errors.soDienThoai}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.soDienThoai}
            errors={errors.soDienThoai}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Ngày sinh
            </label>
            <DatePicker
              className="!w-full"
              format="DD-MM-YYYY"
              onBlur={() => handleBlur({ target: { name: "ngaySinh" } })}

              onChange={(date, dateString) => {
                // console.log(dateString);
                setFieldValue("ngaySinh", dateString);
              }}
            // style={{
            //   width: "100%",
            // }}
            />
          </div>
          {errors.ngaySinh && touched.ngaySinh ? <p className="text-red-500">{errors.ngaySinh}</p> : null}
          <div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Giới tính
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={values.gioiTinh}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.gioiTinh}
                name="gioiTinh"

              >
                <option value="">Vui lòng chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              {errors.gioiTinh && touched.gioiTinh ? <p className="text-red-500">{errors.gioiTinh}</p> : null}
            </div>
          </div>
          <InputCustom
            labelContent={"Mật khẩu"}
            id={"matKhau"}
            name={"matKhau"}
            placeholder={"Vui lòng nhập mật khẩu"}
            value={values.matKhau}
            onChange={handleChange}
            classWrapper="col-span-2"
            error={errors.matKhau}
            onBlur={handleBlur}
            touched={touched.matKhau}
          />
          <div className="space-x-5 mb-5">
            <ButtonCustom content={"Thêm nhân viên"} type="submit" />
            <ButtonCustom content={"Reset Form"} bgColor="bg-black" />
            <ButtonCustom
              content={"Cập nhật nhân viên"}
              bgColor="bg-yellow-500" onClick={() => {
                updateNhanVien();
              }}
            />
          </div>
        </div>
      </form>
      <div className="mb-10">
        <InputCustom
          labelContent={"Tìm Kiếm"}
          id={"timkiem"}
          name={"timkiem"}
          placeholder={"Nhập vào tên nhân viên để tìm kiếm"}
          classWrapper="col-span-2"
          error={errors.matKhau}
          onBlur={handleBlur}
          touched={touched.matKhau}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);  // Cập nhật từ khóa tìm kiếm
            searchNhanVien(e.target.value); // Thực hiện tìm kiếm mỗi khi từ khóa thay đổi
          }}
        />
      </div>
      <TableNhanVien data={arrNhanVien} handleDeleteNhanVien={deleteNhanVien} getInfoNhanVien={getInfoNhanVien} searchNhanVien={searchNhanVien} filteredNhanVien={filteredNhanVien} />
    </div>
  );
};

export default DemoFormReact;
