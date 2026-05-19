import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarDoacao, getCategorias } from '../api'

function NovaDoacaoPage() {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    doador_nome: '',
    doador_email: '',
    cidade: '',
    estado: '',
    status: 'disponivel',
  })

  useEffect(() => {
    getCategorias().then(res => setCategorias(res.data))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setErro(null)

    try {
      await criarDoacao(form)
      navigate('/')
    } catch (err) {
      setErro('Erro ao cadastrar doação. Verifique os campos e tente novamente.')
      setEnviando(false)
    }
  }

  const estados = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
    'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
    'RS','RO','RR','SC','SP','SE','TO'
  ]

  return (
    <div className="form-page">
      <h1>Nova Doação</h1>
      <p className="form-subtitulo">Preencha os dados abaixo para cadastrar um item para doação.</p>

      {erro && <div className="alert-erro">{erro}</div>}

      <form onSubmit={handleSubmit} className="form-doacao">
        <div className="form-grupo">
          <label>Título do item *</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ex: Camisetas infantis tamanho 4"
            required
          />
        </div>

        <div className="form-grupo">
          <label>Descrição *</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descreva o item com detalhes de conservação e medidas..."
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-grupo">
            <label>Categoria *</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="">Selecione...</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-grupo">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-grupo">
            <label>Seu nome *</label>
            <input
              name="doador_nome"
              value={form.doador_nome}
              onChange={handleChange}
              placeholder="Nome completo ou instituição"
              required
            />
          </div>

          <div className="form-grupo">
            <label>Seu e-mail *</label>
            <input
              type="email"
              name="doador_email"
              value={form.doador_email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-grupo">
            <label>Cidade *</label>
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              placeholder="Sua cidade"
              required
            />
          </div>

          <div className="form-grupo">
            <label>Estado *</label>
            <select name="estado" value={form.estado} onChange={handleChange} required>
              <option value="">UF</option>
              {estados.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar Doação'}
        </button>
      </form>
    </div>
  )
}

export default NovaDoacaoPage