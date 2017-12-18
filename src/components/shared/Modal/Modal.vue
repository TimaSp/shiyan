<template>
  <div>
    <div class="modal-mask"></div>
    <div class="modal-wrap">
      <div class="modal-window">
        <div class="modal-body-nn">
          <div class="close-modal-btn" @click="closeModal">
            <i class="fa fa-times"></i>
          </div>
          <h3 class="modal-heading">Create an account
            <Select v-model="accountInfo.currency" style="width:50px; margin-left:10px;color:#ffad28;">
              <Option v-for="item in currencyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>  
          </h3> 
          <div style="margin-bottom: 20px;">  
            <RadioGroup v-model="type">
              <Radio label="card">
                  <Icon type="card"></Icon>
                  <span>Card</span>
              </Radio>
              <Radio label="cash">
                  <Icon type="cash"></Icon>
                  <span>Cash</span>
              </Radio>
              <Radio label="savings">
                  <Icon type="unlocked"></Icon>
                  <span>Savings</span>
              </Radio>
          </RadioGroup>
          </div>
          <div class="input-wrappers">
            <div class="single-input">
              <div class="single-input__label">
                <label> Account Name:</label>
              </div>
              <input v-model="accountInfo.accName" name="accountName" type="text" class="input-nn" placeholder="Account Name"/>
            </div>
            <div class="single-input" v-if="type === 'card'">
              <div class="single-input__label">
                <label> Card Number:</label>
              </div>
              <input v-model="accountInfo.cardNumber" name="cardNumber" type="number" class="input-nn" placeholder="Card Number"/>
            </div>
            <div class="single-input" v-if="type === 'card'">
              <div class="single-input__label">
                <label> Card Name:</label>
              </div>
              <input v-model="accountInfo.cardName" name="cardName" type="text" class="input-nn" placeholder="Card Name"/>
            </div>
            <div class="single-input">
              <div class="single-input__label">
                <label> Start balance:</label>
              </div>
              <input v-model="accountInfo.accBalance" name="balance" type="number" class="input-nn" placeholder="Start Balance"/>
            </div>
          </div>
          <button v-if="isDisabled" style="background:#ddd!important;" class="submit-btn">Create an account</button>
          <button v-if="!isDisabled" class="submit-btn" @click="submit">Create an account</button>
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
        type: 'card',
        currencyList: [
          {
            value: 'CNY',
            label: '元'
          },
          {
            value: 'USD',
            label: '$'
          }
        ],
        accountInfo: {
          currency: 'CNY',
          accName: '',
          cardNumber: '',
          cardName: '',
          accBalance: ''
        }
      }
    },
    props: {
      toggleModal: {
        type: Function
      },
      user: Object
    },
    watch: {
      type() {
        this.accountInfo = {
          accType: '',
          currency: 'CNY',
          accName: '',
          cardNumber: '',
          cardName: '',
          accBalance: ''
        }
      },
      isDisabled() {}
    },
    computed: {
      isDisabled() {
        let isDis = false 
        if (this.type === 'card') {
          values(this.accountInfo).map((v,i) => {
            if (v === '') isDis = true
            else isDis = false
          })
        } else {
          values(this.accountInfo).map((v,i) => {
            if (v === '' && i !== 3 && i !== 4) isDis = true
            else isDis = false
          })
        } 
        return isDis
      }
    },
    methods: {
      closeModal() {
        this.toggleModal()
      },
      submit() {
        this.accountInfo.accType = this.type
        const { uid } = this.user
        const walletRef = wilddog.sync().ref().child('users').child(uid).child('wallets').child(this.accountInfo.accName)
        if (this.type === 'card') {
          walletRef.set({
              ...this.accountInfo,
          }).then(() => {
            console.log('Done')
          }).catch((error) => {
            console.log('Err', error)
          })
        } else {
          walletRef.set({
              accName: this.accountInfo.accName,
              accBalance: this.accountInfo.accBalance,
              accType: this.accountInfo.accType,
              currency: this.accountInfo.currency
          }).then(() => {
            console.log('Done')
          }).catch((error) => {
            console.log('Err', error)
          })
        }
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
      height: 28px;
      line-height: 28px;
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
