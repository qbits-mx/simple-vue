<template>
  <v-card>
    <v-layout>
      <v-app-bar class="flex-grow-0" app dark color="primary">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title></v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer
        style="z-index: 999999"
        v-model="drawer"
        theme="light"
      >
        <template v-slot:prepend>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="3" sm="3" md="3">
              <v-hover v-slot="{ isHovering, props }">
                <v-avatar size="60px" v-bind="props">
                  <v-img
                    v-if="profilePicture"
                    alt="Avatar"
                    :src="profilePicture"
                  >
                  </v-img>
                  <v-icon v-else color="black"></v-icon>
                  <v-expand-transition>
                    <div
                      v-if="isHovering"
                      class="
                        d-flex
                        transition-fast-in-fast-out
                        bg-black-darken-2
                        v-card--reveal
                      "
                      style="height: 100%"
                    >
                      <v-btn
                        icon="mdi-pencil"
                        color="black"
                        class="edit-profile "                        
                        href="/ui/imageprofile"
                      ></v-btn>
                    </div>
                  </v-expand-transition>
                </v-avatar>
              </v-hover>
            </v-col>

            <v-col class=" ml-3" cols="3" sm="3" md="3">
              <strong v-html="this.nick"></strong>
            </v-col>
          </v-row>
        </template>
        <v-divider class="py-3"></v-divider>
        <v-list-item class=" py-2"
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          nav
        >
        </v-list-item>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="logOut" color="primary" prepend-icon="mdi-door">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
import store from "@/store";
import router from "@/router";
import axios from "axios";
import def from "@/assets/default.jpg";
import { ref } from "vue";
export default {
  data: () => ({
    value: 1,
    drawer: false,
    group: null,
    mail: store.state.userData.email,
    nick: store.state.userData.nick,
    userId: store.state.userData.idUser,
    imgProfile: "",
    profilePicture: def,
    items: [
      {
        title: "Home",
        value: "home",
        icon: "mdi-home",
        path: "/",
      },
      {
        title: "Imagenes",
        value: "imagenes",
        icon: "mdi-image",
        path: "/ui/userimages",
      },
      {
        title: "Fizz",
        value: "fizz",
        icon: "mdi-folder",
        path: "/ui/example2",
      },
    ],
  }),
  mounted() {
    this.email = store.state.userData.email;
    axios
      .get(
        "https://upload.qbits.mx/api/up/get-user-profile-photo/" + this.userId,
        {}
      )
      .then((response) => {
        this.imgProfile = ref(response.data.foto);
        this.profilePicture = "https://media.visitanos.net/" + this.imgProfile;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logOut() {
      store.commit("setUserData", {
        userData: {
          idUser: 0,
          nick: "cyz",
          email: "",
          role: "",
          lastSuccesfullAccess: "",
          jwt: "", //  jwt='' => signed: false,
          usuarioDetalle: null,
        },
      });
      router.push("/ui/login");
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
.v-card--reveal {
  align-items: left;
  bottom: 0;
  justify-content: left;
  text-align: left;
  opacity: 0.9;
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding-top: 2%;
  font-size: 4vw;
}
.edit-profile {
  opacity: 0.9;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
.zindex {
  z-index: 999999 !important;
}
</style>