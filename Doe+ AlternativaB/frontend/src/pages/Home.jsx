import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDoacoes, getEstatisticas } from '../api'

function Home() {
  const [doacoes, setDoacoes] = useState([])
  const [estatisticas, setEstatisticas] = useState(null)
  const [filtroStatus, setFiltroStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    getEstatisticas()
      .then(res => setEstatisticas(res.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    getDoacoes(filtroStatus)
      .then(res => {
        setDoacoes(res.data)
        setLoading(false)
      })
      .catch(() => {
        setErro('Erro ao carregar doações. Verifique se o backend está rodando.')
        setLoading(false)
      })
  }, [filtroStatus])

  const statusCor = {
    disponivel: '#059669',
    reservado: '#d97706',
    entregue: '#475569',
  }

  return (
    <div className="container">
      {estatisticas && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-num">{estatisticas.total}</span>
            <span className="stat-label">Total de Doações</span>
          </div>
          <div className="stat-card verde">
            <span className="stat-num">{estatisticas.disponiveis}</span>
            <span className="stat-label">Disponíveis</span>
          </div>
          <div className="stat-card amarelo">
            <span className="stat-num">{estatisticas.reservadas}</span>
            <span className="stat-label">Reservadas</span>
          </div>
          <div className="stat-card cinza">
            <span className="stat-num">{estatisticas.entregues}</span>
            <span className="stat-label">Entregues</span>
          </div>
        </div>
      )}

      <div className="filtros">
        <span style={{ fontSize: '0.9rem', color: 'var(--cinza)', fontWeight: '500' }}>Filtrar:</span>
        {['', 'disponivel', 'reservado', 'entregue'].map(s => (
          <button
            key={s}
            className={`filtro-btn ${filtroStatus === s ? 'ativo' : ''}`}
            onClick={() => setFiltroStatus(s)}
          >
            {s === '' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Carregando doações...</p>}
      {erro && <p className="erro">{erro}</p>}

      {!loading && !erro && (
        <div className="doacoes-grid">
          {doacoes.length === 0 ? (
            <p className="vazio">Nenhuma doação encontrada para este filtro.</p>
          ) : (
            doacoes.map(doacao => (
              <Link to={`/doacoes/${doacao.id}`} key={doacao.id} className="card-doacao">
                <div className="card-header">
                  <span
                    className="card-status"
                    style={{ backgroundColor: statusCor[doacao.status] }}
                  >
                    {doacao.status_display}
                  </span>
                </div>
                <h3 className="card-titulo">{doacao.titulo}</h3>
                <p className="card-desc">{doacao.descricao.substring(0, 100)}...</p>
                <div className="card-footer">
                  <span>{doacao.doador_nome}</span>
                  <span>{doacao.cidade} / {doacao.estado}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Home