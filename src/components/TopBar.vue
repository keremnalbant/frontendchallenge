<template>
<div class="flex-row align-items-center">

  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="http://localhost:8080/">Anasayfa</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
<b-navbar-brand href="http://localhost:8080/AboutView/">Listeleme</b-navbar-brand>

      <!-- Right aligned nav items -->

      <b-navbar-nav>
        <b-nav-form style="margin-left:39rem;" class="mt-1">
          <b-form-input size="sm" class="my-2 my-sm-0" placeholder="Arama"></b-form-input>
        </b-nav-form>

        <b-nav-item-dropdown right style="margin-left: 48rem;">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            Kullanıcı
          </template>
          <b-dropdown-item href="#">Çıkış Yap</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
