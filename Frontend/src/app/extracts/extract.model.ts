import { Category } from '../categories/category/category.model'

export interface Extract {
    id:number,
    vencimento: Date,
    descricao: string,
    valor: number,
    ja_pago: boolean,
        categoria:{
            categoria_id: number,
            categoria_desc: string,
            cor: string,
            receita_ou_despesa: number,
            receita_ou_despesa_desc: string,
            lancamento_origem: string

        }
       
}