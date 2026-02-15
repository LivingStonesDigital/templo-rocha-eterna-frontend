export type Church = {
  id: string;
  name: ChurchName;
  created: string;
  updated: string;
};

enum ChurchName {
  LOUVEIRA = 'Louveira',
  VALINHOS = 'Valinhos',
  VARZEA_PAULISTA = 'Várzea Paulista'
}