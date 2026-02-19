import Pocketbase from 'pocketbase';



export const BASE_URL = process.env.PROD_POCKETBASE
export const pb = new Pocketbase(

  'https://templo-rocha-eterna.fly.dev'
);