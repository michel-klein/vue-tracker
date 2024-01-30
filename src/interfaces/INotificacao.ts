/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO
}

export interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;
  id: number;
}
