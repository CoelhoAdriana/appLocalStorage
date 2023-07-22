// para gerar entradas
class Livro {
    constructor(titulo, autor, genero, statusPessoal) {
        this.titulo = titulo,
        this.autor = autor,
        this.genero = genero,
        this.statusPessoal = statusPessoal
    }
    validarDados() {
        for (let x in this)
        if (this[x] === undefined || this[x] === '' || this[x] === null) {
            return false }
            return true
        }
}
// para que cada entrada seja única
class Biblioteca {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    proximoID() {
        let proximoID = localStorage.getItem('id')
        return parseInt(proximoID)+1
    }
    gravar(l) {
        let id = this.proximoID()
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(l))
     }
     recuperarTodosRegistros() {
     let livros = Array()
     let id = localStorage.getItem('id')
     for(let li = 1; li <= id; li ++) {
        let livro = JSON.parse(localStorage.getItem(li))
        if (livro === null) {
            continue
        } else {
            livro.id = li
            livros.push(livro)
        }
     }
     return livros
    }
    pesquisar(livro) {
        let livrosFiltrados = Array()
        livrosFiltrados = this.recuperarTodosRegistros()
            if (livro.titulo != '') {
                livrosFiltrados = livrosFiltrados.filter(v => v.titulo == livro.titulo)
            } 
            if (livro.autor != '') {
                livrosFiltrados = livrosFiltrados.filter(v => v.autor == livro.autor)
            } 
            if (livro.genero != '') {
                livrosFiltrados = livrosFiltrados.filter(v => v.genero == livro.genero)
            } 
            if (livro.statusPessoal != '') {
                livrosFiltrados = livrosFiltrados.filter(v => v.statusPessoal == livro.statusPessoal)
            }
            return livrosFiltrados
    }
    remover(id) {
        localStorage.removeItem(id)
    }
    }
// para gerar a sequência de entradas
let biblio = new Biblioteca
function cadastrarLivro() {
    let titulo = document.getElementById('titulo')
    let autor = document.getElementById('autor')
    let genero = document.getElementById('genero')
    let statusPessoal = document.getElementById('statusPessoal')
    let livro = new Livro(
        titulo = titulo.value, 
        autor = autor.value, 
        genero = genero.value, 
        statusPessoal = statusPessoal.value
    )
    if (livro.validarDados()) {
        biblio.gravar(livro)
    // sucesso 
    document.getElementById('mensagemModal').innerHTML = 'Registro cadastrado corretamente. <img src="imagens/like.png" style="width: 40px; height: 40px" alt="">'
    document.getElementById('sucessoGravacao').className = "text-success fundoColor3c fixarFundo resizeOnSmall"
    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('genero').value = ''
    document.getElementById('statusPessoal').value = ''
    } else {
        //erro
        document.getElementById('mensagemModal').innerHTML = 'Há campos obrigatórios que não foram preenchidos.'
        document.getElementById('sucessoGravacao').className = "text-danger fundoColor1c fixarFundo resizeOnSmall"
    }
 }
 // consultar a lista
 function carregarListaLivros(livros = Array(), filtro = false) {
    if (livros.length == 0 && filtro == false) {
    livros = biblio.recuperarTodosRegistros()
    }
    let listaLivros = document.getElementById('listaLivros')
    listaLivros.innerHTML =''

    livros.forEach(function(l) {        
        let linha = listaLivros.insertRow()
        linha.insertCell(0).innerHTML = l.titulo
        linha.insertCell(1).innerHTML = l.autor
        linha.insertCell(2).innerHTML = l.genero
        linha.insertCell(3).innerHTML = l.statusPessoal
        let btn = document.createElement('button')
        btn.className = 'btn btnExcluir'
        btn.innerHTML = 'excluir'
        btn.id = `id_livro_${l.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_livro_','')
            biblio.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

// filtro de pesquisa
function pesquisarLivros() {
    let titulo = document.getElementById('titulo').value
    let autor = document.getElementById('autor').value
    let genero = document.getElementById('genero').value
    let statusPessoal = document.getElementById('statusPessoal').value
        let livro = new Livro(titulo, autor, genero, statusPessoal)
        listaLivros.innerHTML = ''
        let livros =  biblio.pesquisar(livro)    
        carregarListaLivros(livros, true)
    }
