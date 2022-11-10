<template>
  <main>
    <section>
      <div
      class="action"
      style= "border: 2px solid black"
      >
      <header>
        <h3>Follow Another User</h3>
      </header>
      <form @submit.prevent>
          <label for="lname">Username of user to follow:</label>
          <input type="text" id="lname" name="lname" ref="please"><br><br>
          <button @click="followUser">
              Follow User
          </button>
          <button
          class="regMsg"
          v-if="message === 'none'"
          >
            
        </button>
          <button
          class="badMsg"
          v-else-if="message === 'noUser'">
            This user does not exist
        </button>
          <button
          class="goodMsg"
          v-else-if="message === 'success'">
            You have succesfully followed this user!
      </button>
      <button
          class="badMsg"
          v-else-if="message === 'alreadyFollow'">
            You are already following this user
      </button>
      </form> 
      
    </div>
    <div
      class="action"
      style= "border: 2px solid black"
      >
      <header>
        <h3>Unfollow Another User</h3>
      </header>
      <form @submit.prevent>
          <label for="lname">Username of user to unfollow:</label>
          <input type="text" id="lname" name="lname" ref="unFollowId"><br><br>
          <button @click="unFollowUser">
              unFollow User
          </button>
          <button
          class="regMsg"
          v-if="unfollowMsg === 'none'"
          >
            
        </button>
        <button
          class="badMsg"
          v-else-if="unfollowMsg === 'noUser'">
            This user does not exist
        </button>
          <button
          class="goodMsg"
          v-else-if="unfollowMsg === 'success'">
            You have succesfully unfollowed this user!
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
      alerts: {}, // Displays success/error messages encountered during freet modification
      message: "none",
      unfollowMsg: "none"
    };
  }, 
  methods: {
      async followUser(){
          const getOptions = {
              method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
          }
          const options = {
              method: 'PUT', headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
          }
          const userId = await fetch(`/api/users/${this.$refs.please.value}`, getOptions).then((r) => r.json());
          

          if (userId.user){
            console.log("user exists");
            console.log(userId.user._id);
          } else{
            console.log("user doesnt exist");
            this.message = "noUser";
          }
          try {
              const r = await fetch(`/api/followers/${userId.user._id}`, options).then((r) => r.json());
              console.log("hello");
              console.log(r);
              if (r.successful){
                this.message = "success";
              } else{
                this.message = "alreadyFollow";
              }
              if (!r.ok) {
              const res = await r.json();
              throw new Error(res.error);
              }
          } catch (e) {
              this.$set(this.alerts, e, 'error');
              setTimeout(() => this.$delete(this.alerts, e), 3000);
          }
      },
      async unFollowUser(){
          const getOptions = {
              method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
          }
          const options = {
              method: 'DELETE', headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
          }
          const userId = await fetch(`/api/users/${this.$refs.unFollowId.value}`, getOptions).then((r) => r.json());
          

          if (userId.user){
            console.log("user exists");
            console.log(userId.user._id);
          } else{
            console.log("user doesnt exist");
            this.unfollowMsg= "noUser";
          }
          try {
              const r = await fetch(`/api/followers/${userId.user._id}`, options).then((r) => r.json());
              console.log("hello");
              console.log(r);
              if (r.successful){
                this.unfollowMsg = "success";
              } else{
                this.unfollowMsg = "alreadyFollow";
              }
              if (!r.ok) {
              const res = await r.json();
              throw new Error(res.error);
              }
          } catch (e) {
              this.$set(this.alerts, e, 'error');
              setTimeout(() => this.$delete(this.alerts, e), 3000);
          }
      },
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

button.badMsg {background-color: transparent;
  border: none;
  color: red;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  border-radius: 20%;
}

button.goodMsg {background-color: transparent;
  border: none;
  color: green;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  border-radius: 20%;
}

button.regMsg {background-color: transparent;
  border: none;
  color: black;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  border-radius: 20%;
}

/* div{
  border: 5 solid green;
  padding: 10;
  margin: 10;
} */
</style>
