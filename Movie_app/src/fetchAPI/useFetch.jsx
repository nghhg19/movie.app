import { useState, useEffect } from "react";

// Hook tùy chỉnh để fetch dữ liệu từ một endpoint đã cho
const useFetch = (endpoint) => {
  // State để lưu trữ dữ liệu đã fetch
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3${endpoint}`);
        // Kiểm tra nếu response thành công
        if (response.ok) {
          const data = await response.json();
          // Cập nhật state với dữ liệu đã fetch
          setData(data);
        } else {
          console.error("Không thể fetch dữ liệu:", response.statusText);
        }
      } catch (error) {
        console.error("Thông báo lỗi:", error.message);
      }
    };

    // Gọi fetchData khi endpoint thay đổi
    fetchData();
  }, [endpoint]);

  return data;
};

export default useFetch;
