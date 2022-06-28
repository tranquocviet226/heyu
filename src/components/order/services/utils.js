const formatCurrency = (value) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' đ'

const initTipList = [
  {
    id: 1,
    value: 5000,
    selected: false
  },
  {
    id: 2,
    value: 10000,
    selected: false
  },
  {
    id: 3,
    value: 15000,
    selected: false
  },
  {
    id: 4,
    value: 20000,
    selected: false
  },
  {
    id: 5,
    value: 25000,
    selected: false
  },
  {
    id: 6,
    value: 30000,
    selected: false
  },
]

export {
  formatCurrency,
  initTipList
}