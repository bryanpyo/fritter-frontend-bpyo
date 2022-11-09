<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Follow a User</h2>
      </header>
      <FollowUserForm />
    </section>
  </main>
</template>

<script>
import FollowUserForm from '@/components/Follow/FollowUserForm.vue';

export default {
  name: 'FollowerPage',
  components: {
    FollowUserForm
  }
};
</script>
