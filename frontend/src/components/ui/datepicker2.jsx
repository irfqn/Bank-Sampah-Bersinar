// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // Membuat objek tanggal dengan 18 tahun yang lalu dari tanggal saat ini

  const handleChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        maxDate={maxDate} // Menetapkan tanggal maksimum menjadi 18 tahun yang lalu dari tanggal hari ini
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100} // Memperbolehkan tahun yang bisa dipilih hingga 100 tahun yang lalu
        isClearable
        placeholderText="Pilih tanggal lahir"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      />
      {/* {selectedDate && (
        <p>Tanggal lahir yang dipilih: {selectedDate.toLocaleDateString()}</p>
      )} */}
    </div>
  );
}

export default MyDatePicker;

// eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// // eslint-disable-next-line react/prop-types
// function MyDatePicker({ id, selected, onChange }) {
//   const [selectedDate, setSelectedDate] = useState(selected);
//   const today = new Date();
//   const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // Membuat objek tanggal dengan 18 tahun yang lalu dari tanggal saat ini

//   const handleChange = date => {
//     setSelectedDate(date);
//     onChange(id, date); // Mengirimkan id komponen dan tanggal terpilih ke parent component
//   };

//   return (
//     <div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleChange}
//         dateFormat="dd/MM/yyyy"
//         maxDate={maxDate} // Menetapkan tanggal maksimum menjadi 18 tahun yang lalu dari tanggal hari ini
//         showYearDropdown
//         scrollableYearDropdown
//         yearDropdownItemNumber={100} // Memperbolehkan tahun yang bisa dipilih hingga 100 tahun yang lalu
//         isClearable
//         placeholderText="Pilih tanggal lahir"
//         className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
//       />
//       {/* {selectedDate && (
//         <p>Tanggal lahir yang dipilih: {selectedDate.toLocaleDateString()}</p>
//       )} */}
//     </div>
//   );
// }

// export default MyDatePicker;
