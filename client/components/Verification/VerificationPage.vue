<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Verification Options</h2>
      </header>
      <FollowUserForm />
    </section>
  </main>
</template>

<script>
import FollowUserForm from '@/components/Verification/VerificationForm.vue';
// import FollowUserForm from '@/components/Follow/FollowUserForm.vue';

export default {
  name: 'FollowerPage',
  components: {
    FollowUserForm
  }
};
</script>
