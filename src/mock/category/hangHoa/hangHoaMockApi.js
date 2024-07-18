import { products } from './hangHoa';

export const hangHoaMockApi = (mock) => {
  mock.onGet('/products').reply((config) => {
    const {
      mahang = '',
      tenHangBan = '',
      tenHangMua = '',
      donViTinh = '',
      taiKhoanHang = '',
      taiKhoanGiaVon = '',
      taiKhoanDoanhThu = '',
    } = config;

    let filteredProducts = [...products];

    if (mahang) {
      filteredProducts = filteredProducts.filter((p) => p.mahang.toLowerCase().includes(mahang.toLowerCase()));
    }
    if (tenHangBan) {
      filteredProducts = filteredProducts.filter((p) => p.tenHangBan.toLowerCase().includes(tenHangBan.toLowerCase()));
    }
    if (tenHangMua) {
      filteredProducts = filteredProducts.filter((p) => p.tenHangMua.toLowerCase().includes(tenHangMua.toLowerCase()));
    }
    if (donViTinh) {
      filteredProducts = filteredProducts.filter((p) => p.donViTinh.toLowerCase().includes(donViTinh.toLowerCase()));
    }
    if (taiKhoanHang) {
      filteredProducts = filteredProducts.filter((p) =>
        p.taiKhoanHang.toLowerCase().includes(taiKhoanHang.toLowerCase()),
      );
    }
    if (taiKhoanGiaVon) {
      filteredProducts = filteredProducts.filter((p) =>
        p.taiKhoanGiaVon.toLowerCase().includes(taiKhoanGiaVon.toLowerCase()),
      );
    }
    if (taiKhoanDoanhThu) {
      filteredProducts = filteredProducts.filter((p) =>
        p.taiKhoanDoanhThu.toLowerCase().includes(taiKhoanDoanhThu.toLowerCase()),
      );
    }

    return [
      200,
      {
        results: filteredProducts,
        count: filteredProducts.length,
      },
    ];
  });

  // Add a new product
  mock.onPost('/products').reply((config) => {
    const newProduct = JSON.parse(config.data);
    newProduct.id = products.length + 1;
    products.push(newProduct);
    return [201, newProduct];
  });

  // Update a product
  mock.onPut(/\/products\/(\d+)/).reply((config) => {
    const id = config.url.split('/').pop();
    const updatedProduct = JSON.parse(config.data);
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      return [200, products[index]];
    } else {
      return [404, { message: 'Product not found' }];
    }
  });

  // Delete a product
  mock.onDelete(/\/products\/(\d+)/).reply((config) => {
    const id = config.url.split('/').pop();
    console.log(id);
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      return [204];
    } else {
      return [404, { message: 'Product not found' }];
    }
  });

  return mock;
};
