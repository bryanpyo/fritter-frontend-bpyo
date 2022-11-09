<template>
    <main>
      <section>
        <header>
          <h2>Following Options for @{{ $store.state.username }}</h2>
        </header>
        <div
        class="actions"
      >
        <button @click="followUser">
          🗑️ Delete
        </button>
        <!-- <form v-on:submit.prevent="followUser">
            <label for="lname">Username of user to follow:</label>
            <input type="text" id="lname" name="lname"><br><br>
            <input type="submit" value="Submit">
        </form>  -->
        <form @submit.prevent>
            <label for="lname">Username of user to follow:</label>
            <input type="text" id="lname" name="lname" ref="please"><br><br>
            <button @click="followUser">
                Follow User
            </button>
        </form> 
      </div>
      </section>
    </main>
  </template>
  


  <script>
  export default {
    name: 'FreetComponent',
    data() {
      return {
        editing: false, // Whether or not this freet is in edit mode
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    }, 
    methods: {
        async followUser(){
            const options = {
                method: 'PUT', headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
            }
            console.log("inside");
            console.log(this.session);
            // console.log(req.session.userId);
            try {
                const r = await fetch(`/api/followers/${this.$refs.please.value}`, options);
                console.log(r)
                if (!r.ok) {
                const res = await r.json();
                throw new Error(res.error);
                }
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
    //   followUser(submitEvent){
    //     const params = {
    //       method: 'GET', 
    //       body: 'hello',
    //       maybe: this.$refs.please.value
    //     }
    //     console.log(params)
    //     this.request(params);
    //   },
      async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }
      console.log(options);

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
    }
  };
  
  </script>

<style scoped>
.follow {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>