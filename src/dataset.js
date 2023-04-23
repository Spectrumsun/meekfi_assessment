import { faker } from '@faker-js/faker';
export const colorSets = [
  {
    bC: 'rgba(255, 99, 132, 0.2)',
    bG: 'rgba(255, 99, 132, 1)',
  },
  {
    bC: 'rgba(54, 162, 235, 0.2)',
    bG: 'rgba(54, 162, 235, 1)',
  },
  {
    bC: 'rgba(255, 206, 86, 0.2)',
    bG: 'rgba(255, 206, 86, 1)',
  },
  {
    bC: 'rgba(75, 192, 192, 0.2)',
    bG:  'rgba(75, 192, 192, 1)',
  },
  {
    bC: 'rgba(153, 102, 255, 0.2)',
    bG: 'rgba(153, 102, 255, 1)',
  },
  {
    bC:  'rgba(255, 159, 64, 0.2)',
    bG: 'rgba(255, 159, 64, 1)',
  },
]

export const networks = ['GLO', 'MTN', 'AIRTEL', '9MOBILE'];

export const states = ['Auchi', 'Benin', 'Ekpoma'];
export const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
export const carSales = [ 'Toyota', 'Lexus', 'BMW', 'Benz', 'Hyundai'];
export const dataSets = carSales.map((carSale, index) => ({
  product: carSale,
  sales: years.map((year) => {
    const generateSales = months.map(() => faker.datatype.number({ min: 0, max: 300 }));
    return {
      year: year,
      totalAmountSold: generateSales.reduce((partialSum, a) => partialSum + a, 0),
      monthlySales: months.map((month, index) => ({
        month: month,
        sales: generateSales[index]
      }))
    }}),
    borderColor: colorSets[index].bG,
    backgroundColor: colorSets[index].bC,
  })
);
export const products = ['Apple', 'Samsung', 'Nokia', 'Huawei', 'Oppo', 'Others'];
export const networkDatas = states.map((state) => ({
  stateName: state,
  networkData: networks.map(() => ({
    totalConnected: faker.datatype.number({ min: 0, max: 300 }),
  }))
}));

export const smartPhoneShare = products.map(() => faker.datatype.number({ min: 0, max: 300 }));

