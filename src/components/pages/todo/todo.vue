<template>
  <Row>
    <div class="productTable">
      <Row class-name="tableHeader">
        <Col span="24">
          <h1>ADD YOUR ITEM</h1>                 
        </Col>
        <Col span="6">
          <input 
              class="input" 
              type="text"
              placeholder="Name"
              v-model="productName"
            /> 
        </Col>
        <Col span="6">
            <input 
              class="input"
              type="text"
              placeholder="Quantity"
              v-model="productQuantity"
            />
        </Col>
        <Col span="6">
            <input
              class="input"
              type="text"
              placeholder="Price"
              v-model="productPrice"
            />             
        </Col>
        <Col span="6">
            <button  v-if="save" 
                      @click="saveChanges()"
                      />SAVE
            </button>
            <button @click="addProduct()">ADD</button>
        </Col>
      </Row>
           
           <div class="column content">
             <table class="table is-bordered is-striped is-narrow is-fullwidth">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th> 
                    <th></th>                   
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th><abbr title="Position">Total price</abbr></th>
                    <th>{{count}}</th>
                    <th></th>
                    <th></th>                                        
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="(index, key) in products" :key="key">
                    <th>{{index.name}}</th>
                    <td>{{index.quantity}}</td>
                    <th>{{index.price}}</th> 
                    <td>
                      <button class="button" 
                              @click="editProduct(key)"
                              >
                        <i class="fa fa-pencil"></i>
                      </button>
                      <button class="button"
                              @click="removeProduct(key)"
                              >
                        <i class="fa fa-trash"></i>
                      </button>
                    </td> 
                  </tr>        
                </tbody>
              </table>
           </div>
    </div>
  </Row>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      productName: '',
      productQuantity: '',
      productPrice: '',
      products: [],
      save: false,
      count: 0
    }
  },
  methods:  {
    addProduct() {
      let product = {
                      name: this.productName,
                      quantity: this.productQuantity,
                      price: this.productPrice 
                    }
                    this.count = this.count + parseInt(product.price)
      this.products.push(product);
      this.cleanForms()
    },
    editProduct(id) {
      this.save = true
      this.productName = this.products[id].name,
      this.productQuantity = this.products[id].quantity,
      this.productPrice = this.products[id].price
      this.key = id
      this.count = this.count - this.productPrice
    },
    saveChanges() {
          this.products[this.key].name = this.productName
          this.products[this.key].quantity = this.productQuantity
          this.products[this.key].price = this.productPrice 
          this.save = false
          this.count = this.count + parseInt(this.productPrice)
          this.cleanForms()   
    },
    removeProduct(key)  {
      this.count = this.count - parseInt(this.products[key].price)
      this.products.splice(key)
    },
    cleanForms() {
        this.productName = ''
        this.productQuantity = ''
        this.productPrice = ''
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .productTable {
    border: 1px solid #e4e3e3;
    background: #fff;
    margin: 70px auto;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);    
  }
  .tableHeader {
    background-color: #f0db4f;    
    padding: 40px;
  }
  button:hover {
    background-color: #757575;
    color: white;
  }
  button:hover i{
    color: white;
  }
  button {
    background: 0 0;
    border: none;
    border-radius: 2px;
    color: #757575;
    position: relative;
    height: 36px;
    margin: 0;
    min-width: 64px;
    padding: 0 16px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0;
    overflow: hidden;
    will-change: box-shadow;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 36px;
    vertical-align: middle;
    border: 1px solid #757575;
}
    h1, h2 {
      font-weight: 900;
      font-size: 30px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
    .content {
      background: #e4e3e3;
    }
</style>
