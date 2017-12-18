<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-wrap">
      <div class="modal-window">
        <div class="modal-body-nn" style="text-align: center;">
          <div class="close-modal-btn" @click="closeModal">
            <i class="fa fa-times"></i>
          </div>
          <h3 class="modal-heading">Create a transaction
            <input style="width:50px;" v-model="amount" name="amount" type="number" class="input-nn" placeholder=""/>
            <Select v-model="currency" style="width:50px; margin-left:10px;color:#ffad28;">
              <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>  
          </h3>
          <div style="margin-bottom: 15px;">
            <RadioGroup v-model="type">
              <Radio label="input">
                  <span>Input</span>
              </Radio>
              <Radio label="withdraw">
                  <span>Withdraw</span>
              </Radio>
            </RadioGroup>
          </div>
          <input style="width:300px;" v-model="name" name="name" type="text" class="input-nn" placeholder="Transaction Name"/>
            <div style="margin-bottom: 20px;">
              <Input v-model="description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." style="width:300px;"></Input>
            </div>
          <button v-if="isDisabled" style="background:#ddd!important;" class="submit-btn">Submit an transaction</button>
          <button v-if="!isDisabled" class="submit-btn" @click="submit">Submit an transaction</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { values } from 'ramda'
  export default {
    data() {
      return { 
        type: '',
        amount: 0,
        description: '',
        name: '',
        currency: '',
        currencyList: [
          {
            value: 'CNY',
            label: '元'
          },
          {
            value: 'USD',
            label: '$'
          }
        ]
      }
    },
    props: {
      toggleModal: {
        type: Function
      },
      account: Object
    },
    watch: {
      isDisabled() {},
      type() {}
    },
    computed: {
      isDisabled() {
        let isDis = false 
        if (this.type !== '' && this.amount !== '' && this.description !== '' && this.name !== '' && this.currency !== '' ) {
          isDis = false
        } else isDis = true
        return isDis
      }
    },
    methods: {
      closeModal() {
        this.toggleModal()
      },
      submit() {
        const uid = localStorage.userUid
        const parentRef = wilddog.sync().ref().child('users').child(uid).child('wallets').child(this.account.accName)
        if (this.type === 'input') {
          let newBalance = parseInt(this.account.accBalance) + parseInt(this.amount)
          parentRef.update({
            accBalance: newBalance
          })
          this.toggleModal()
        } else if (this.type === 'withdraw') {
          let newBalance = parseInt(this.account.accBalance) - parseInt(this.amount)
          parentRef.update({
            accBalance: newBalance
          })
          this.toggleModal()
        }
        const transactionRef = wilddog.sync().ref().child('users').child(uid).child('wallets').child(this.account.accName).child('transactions').child(this.name)
        transactionRef.set({
              type: this.type,
              name: this.name,
              amount: this.amount,
              currency: this.currency,
              description: this.description,
              date: Date.now()
          }).then(() => {
            console.log('Done')
          }).catch((error) => {
            console.log('Err', error)
          })
      }
    }
  }
</script>

<style lang="css">

  .modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.8);
    height: 100%;
    z-index: 1000;
  }
  .modal-wrap {
    position: fixed;
    overflow: auto;
    top: 77px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .modal-window {
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      outline: 0;
      top: 0;
      overflow: auto;
      padding-bottom: 77px;
    }
    .modal-body-nn {
      background: #fff;
      position: relative;
      border-radius: 4px;
      padding: 15px;
    }
    .modal-part {
      font-size: 12px;
      line-height: 1.5;
    }
    .modal-header {
      position: relative;
      padding: 0!important;
      display:flex;
      width:100%;
      background-color: #fff;
      border-radius: 4px 4px 0 0;
    }
    .close-modal-btn {
      color: #ddd;
      position: absolute;
      top: 0;
      right: 5px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      transition: all ease-in-out .2s
    }
    .close-modal-btn:hover {
      cursor: pointer;
      color: rgba(255,173,40,1);
      transition: all ease-in-out .2s
    }
    .modal-heading {
      color: #818181;
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
    }
    .single-input {
      display: block;
      width: 100%;
    }
    .single-input .single-input__label {
      width: 19%;
      display: inline-block;
    }
    .input-nn {
      height: 32px;
      line-height: 32px;
      width: 80%;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 15px;
      color: #818181; 
      padding-left: 5px;
      transition: all ease-in-out .2s;
      display: inline-block;
    }
    .input-nn:focus {
      cursor: pointer;
      transition: all ease-in-out .2s;
      border: 1px solid rgba(255,173,40,1)!important;
      outline: 0;
    }
    .input-nn:hover {
      cursor: pointer;
      transition: all ease-in-out .2s;
      border: 1px solid rgba(255,173,40,0.6);
      outline: 0;
    }
    .submit-btn {
      width: 50%;
      height: 28px;
      background: rgba(255,173,40,0.6);
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: all ease-in-out .2s;
    }
    .submit-btn:hover {
      cursor: pointer;
      transition: all ease-in-out .2s;
      background: rgba(255,173,40,1);
    }
</style>
