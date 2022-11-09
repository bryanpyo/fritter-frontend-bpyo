<!-- Form for following a user (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowUserForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      fields: [
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Change password',
      callback: () => {
        const message = 'Successfully changed password!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
