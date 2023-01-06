<template>
  <div class="centra ancho">

    <h2>Registro a Artemisa</h2>

    <div class="card-body">

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>Nombre(s)</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-name" v-model="name"
              class="borders form-control icon-user"
              placeholder="ej. Maximiliano José" />
              <small class="notValid">{{ msgName }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>Apellido(s)</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-last" v-model="last"
              class="borders form-control icon-user"
              placeholder="ej. Torres Pérez" />
              <small class="notValid">{{ msgLast }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>Correo</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-mail" v-model="mail"
              class="borders form-control icon-user"
              placeholder="ej. max.torres@gmail.com" />
              <small class="notValid">{{ msgMail }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>Teléfono</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-phone" v-model="phone"
              class="borders form-control icon-user"
              placeholder="ej. +52 55 3344 5566" />
              <small class="notValid">{{ msgPhone }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>CURP</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-curp" v-model="curp"
              class="borders form-control icon-user"
              placeholder="ej. AESG 990102 HAS RS12" />
              <small class="notValid">{{ msgCurp }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p>LinkedIn</p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <input
              type="text" id="text-linkedin" v-model="linkedin"
              class="borders form-control icon-user"
              placeholder="ej. https://linkedin.com/max" />
              <small class="notValid">{{ msgLinkedin }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 text-left">
          <div class="row px-3">
            <p></p>
          </div>
        </div>
        <div class="col-sm-9 text-left">
          <div class="row px-3">
            <button @click="register" class="btn btn-success">Registrarme</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 text-left">
          <small class="notValid">{{ systemErrors }}</small>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'
import store from '../store'

const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const curpRegex  = new RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const phoneRegex = new RegExp(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
const urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
const backendUrl = process.env.VUE_APP_BACKEND_URL

export default {
   setup() {
      console.log(backendUrl)
   }, 
   data: function () {
       return {
         name: "",
         msgName:"",
         last: "",
         msgLast:"",
         mail: "",
         msgMail:"",
         curp : "",
         msgCurp:"",
         linkedin: "",
         msgLinkedin:"",
         phone: "",
         msgPhone:"",
         systemErrors:"",
         allCorrect: true,
         pba: process.env.VUE_APP_TITLE
       }
   },
   methods: {
     validateUrl: function() {
        this.msgLinkedin = ""
        if(this.linkedin.length>70) {
          this.msgLinkedin="La longitud máxima para tu liga de linkedin es de 70 caracteres"
          this.allCorrect = false
          return
        }
        if(!urlRegex.test(this.linkedin)) {
          this.msgLinkedin="La liga de linkedin proporcionada es inválida"
          this.allCorrect = false
          return
        }
     },
     validatePhone: function() {
        // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
        // https://regex101.com/r/QXAhGV/1
        this.msgPhone = ""
        if(this.phone.length>20) {
          this.msgPhone="La longitud máxima para un teléfono es de 20 caracteres"
          this.allCorrect = false
          return
        }
        if(!phoneRegex.test(this.phone)) {
          this.msgPhone="El teléfono proporcionado es inválido. Ejamplo de formato admitido: +52 55 4321 4321"
          this.allCorrect = false
          return
        }
     },
     validateCurp: function() {
       this.msgCurp = ""
       if(this.curp.trim().length<1) {
         this.msgCurp="El CURP no puede ser vacío"
         this.allCorrect = false
         return
       }
       if(!curpRegex.test(this.curp.toUpperCase())) {
         this.msgCurp="El CURP es inválido"
         this.allCorrect = false
         return
       }
     },
     validateLast: function() {
       this.msgLast = ""
       if(this.last.trim().length<1) {
         this.msgLast="Los Apellidos no pueden ser vacíos"
         this.allCorrect = false
         return
       }
       if(this.last.length>30) {
         this.msgLast="La longitud máxima para los apellidos es de 30 caracteres"
         this.allCorrect = false
         return
       }
     },
     validateName: function() {
       this.msgName = ""
       if(this.name.trim().length<1) {
         this.msgName="El nombre no puede ser vacío"
         this.allCorrect = false
         return
       }
       if( this.name.length>30) {
         this.msgName="La longitud máxima para un nombre es de 30 caracteres"
         this.allCorrect = false
         return
       }
     },
     validateMail: function() {
        this.msgMail = ""
        if(this.mail.length>50) {
          this.msgMail="La longitud máxima para un correo es de 50 caracteres"
          this.allCorrect = false
          return
        }
        if(!emailRegex.test(this.mail)) {
          this.msgMail="El correo proporcionado es inválido"
          this.allCorrect = false
          return
        }
     },
     validateDuplicatedMail: function() {
        if(this.mail==="ok@ok.com") {
          this.msgMail="Este correo ya se encuentra registrado."
          this.allCorrect = false
          return
        }
     },
     register: function() {
        this.allCorrect = true
        this.validateMail()
        this.validateName()
        this.validateLast()
        this.validateCurp()
        this.validatePhone()
        this.validateUrl()
        this.validateDuplicatedMail()

        if(!this.allCorrect) {
          console.log("err")
        } else {
          this.save()
        }
     },
     save: function() {
        this.systemErrors = ''
        axios.post(this.backendUrl + '/generate', {
            nombreCompleto: this.name + ' ' + this.last,
            correo: this.mail,
            telefono: this.phone,
            linkedin: this.linkedin,
            curp: this.curp
        }).then(response => {
            if(response.data.error==='no error') {
              store.commit('setUser', response.data.user);
              store.commit('setGen', response.data.gen);
              store.commit('setNombreCompleto', this.name + ' ' + this.last);
              store.commit('setError', response.data.error);
              router.push({'name':'thanks'})
            } else {
              this.systemErrors = response.data.error
            }
        }).catch(error => {
          this.systemErrors = error
        })
     }
     /*
     //validado = curp.match(curpRegEx);
     digitoVerificador: function(curp17) {
         //Fuente https://consultas.curp.gob.mx/CurpSP/
         var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
             lngSuma      = 0.0,
             lngDigito    = 0.0;
         for(var i=0; i<17; i++)
             lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
         lngDigito = 10 - lngSuma % 10;
         if (lngDigito == 10) return 0;
         return lngDigito;
     }
     //if (validado[2] != digitoVerificador(validado[1])) return false;
     */
   }
}
</script>

<style scoped>
.ancho {
  max-width: 560px;
}
.centra {
  margin: auto;
  padding-top: 10%;
}
.notValid {
  color:#ff0000;
}
</style>
