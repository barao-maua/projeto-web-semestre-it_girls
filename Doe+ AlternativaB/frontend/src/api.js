// api.js — centraliza todas as chamadas à API Django
// Qualquer mudança de URL só precisa ser feita aqui

import axios from 'axios'

// URL base do backend Django
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// Buscar todas as doações (com filtro opcional por status)
export const getDoacoes = (status = '') => {
  const params = status ? { status } : {}
  return api.get('/doacoes/', { params })
}

// Buscar uma doação pelo ID
export const getDoacao = (id) => api.get(`/doacoes/${id}/`)

// Criar nova doação (POST)
export const criarDoacao = (dados) => api.post('/doacoes/', dados)

// Atualizar doação (PATCH — atualização parcial)
export const atualizarDoacao = (id, dados) => api.patch(`/doacoes/${id}/`, dados)

// Deletar doação
export const deletarDoacao = (id) => api.delete(`/doacoes/${id}/`)

// Buscar categorias
export const getCategorias = () => api.get('/categorias/')

// Buscar estatísticas do dashboard
export const getEstatisticas = () => api.get('/estatisticas/')

export default api