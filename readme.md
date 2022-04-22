# SUPER LISTA

**Isabela Carolina Ribeiro Santos**

O objetivo desta aplicação é automatizar o processo de criação de listas de compras para o mercado. A ideia é permitir que ao longo do mês, à medida que os alimentos forem acabando, o usuário registre essa informação. Com isso, no dia da compra o cliente possuirá sua lista completa, sem a necessidade de verificar o que ainda há na despensa. 


## 1. Interfaces

### Tela principal

Nesta tela, o usuário verá sua lista de compras, que conterá o grupo de produtos registrados como faltantes e a lista de produtos sugeridos pela aplicação. 

A lista de faltantes é definida pelo usuário quando o mesmo defino o produto como acabado ou adiciona um produto sugerido a lista de compras. Ela possui um checklist, para que os usuários preencham os produtos já selecionados no mercado. Porém essa informação é opcional, pois uma lista de compras pode ser encerrada sem essa indicação. 

Já a lista de sugeridos é formada pelo sistema a partir da periodicidade e da data de última compra. Ela contém a opção de adicionar a lista, que coloca o produto sugerido na lista de produtos faltantes.  

Nessa tela o usuário também pode finalizar a lista de produtos faltantes, indicando que os produtos já foram comprados.

Obs: o preenchimento do checklist não é obrigatório, ao finalizar a lista todos os produtos são dados como comprados. 

### Tela de produtos

Nesta outra tela, o usuário verá a lista de produtos cadastrados no sistema. Nela, ele também poderá indicar os produtos faltantes a partir do toggle button "Acabou?" presente na listagem de produto.

### Tela de cadastro e edição de produtos

Nesta outra tela, o usuário poderá cadastrar, editar e deletar as informações como nome, marca, última compra, valor, periodicidade, e quantidade produto. Quando o usuário está online, esta tela também permite a visualização dos gráficos de consumo e preço do produto.


## 2. Dados do usuário

Nesta aplicação, os dados do usuário são armazenados no localstorage. Não foi necessário guardar dados pessoais do usuário, mas sim informações sobre os produtos que o mesmo usa. Para isso, criou-se três keys para o armazenamento. Os produtos são todos os produtos cadastrados e contém informações de nome, marca, última compra, periodicidade de compra, quantidade e uma lista de consumo e preço durante o ano. Já os produtos faltantes contém apenas os produtos marcados como acabados, sua estrutura é similar à de produtos. Os produtos sugeridos contém os produtos que a aplicação identifica como importantes para o usuário, considerando a data da última compra e a periodicidade de compra.  


## 3. Checklist de implementação

- A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? **Sim**
- A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes? **Sim**
- A aplicação foi desenvolvida com o React? **Sim**
- A aplicação contém pelo menos dois componentes React além do componente principal? **Sim**
- A aplicação armazena e usa de forma relevante dados complexos do usuário? **Sim**
- O código da minha aplicação possui comentários explicando cada operação? **Sim**
- A aplicação está funcionando corretamente? **Sim**
- A aplicação está completa? **Não**, está faltando possibilidade de inserção de uma imagem para o produto. Tive muitas dúvidas ao fazer e com as entregas de TCC chegando não consegui terminar. 