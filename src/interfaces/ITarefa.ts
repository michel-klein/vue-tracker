import IProjeto from './IProjeto';

/* eslint-disable semi */
export default interface ITarefa {
  duracaoEmSegundos: number;
  descricao: string;
  projeto: IProjeto;
  id: number;
}
