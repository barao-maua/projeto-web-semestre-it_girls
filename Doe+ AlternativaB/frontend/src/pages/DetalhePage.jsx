import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDoacao, atualizarDoacao, deletarDoacao } from '../api'

function DetalhePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doacao, setDoacao] = useState(null)
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  useEffect(() => {
    getDoacao(id)
      .then(res => {
        setDoacao(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  const handleStatusChange = async (novoStatus) => {
    setSalvando(true)
    try {
      const res = await atualizarDoacao(id, { status: novoStatus })
      setDoacao(res.data)
      setMensagem('Status atualizado com sucesso.')
      setTimeout(() => setMensagem(null), 3000)
    } catch {
      setMensagem('Erro ao atualizar status.')
    }
    setSalvando(false)
  }

  const handleDeletar = async () => {
    if (!confirm('Tem certeza que deseja remover este anúncio de doação?')) return
    await deletarDoacao(id)
    navigate('/')
  }

  if (loading) return <p className="loading">Carregando detalhes...</p>
  if (!doacao) return <p className="erro">Doação não encontrada ou removida.</p>

  return (
    <div className="detalhe-page">
      <button className="btn-voltar" onClick={() => navigate('/')}>Voltar</button>

      <div className="detalhe-card">
        <div className="detalhe-header">
          <div>
            <h1>{doacao.titulo}</h1>
            <p className="detalhe-categoria">{doacao.categoria_nome}</p>
          </div>
        </div>

        <p className="detalhe-desc">{doacao.descricao}</p>

        <div className="detalhe-info-grid">
          <div><strong>Doador</strong><p>{doacao.doador_nome}</p></div>
          <div><strong>Contato</strong><p>{doacao.doador_email}</p></div>
          <div><strong>Localização</strong><p>{doacao.cidade} / {doacao.estado}</p></div>
          <div><strong>Data de Cadastro</strong><p>{new Date(doacao.criado_em).toLocaleDateString('pt-BR')}</p></div>
        </div>

        <div className="status-update">
          <h3>Atualizar Status da Doação</h3>
          <div className="status-btns">
            {['disponivel', 'reservado', 'entregue'].map(s => (
              <button
                key={s}
                className={`status-btn ${doacao.status === s ? 'ativo' : ''}`}
                onClick={() => handleStatusChange(s)}
                disabled={salvando || doacao.status === s}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          {mensagem && <p className="msg-sucesso">{mensagem}</p>}
        </div>

        <button className="btn-deletar" onClick={handleDeletar}>
          Remover Anúncio
        </button>
      </div>
    </div>
  )
}

export default DetalhePage