<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header>
      <div>
      <h3 class="u1">
        @{{ freet.author }}
        <img 
        v-if="vTier === 'blue'"
        src="../../public/images/blue.png" alt="blue verifiation" class="verificationIcon">
        <img 
        v-else-if="vTier === 'silver'"
        src="../../public/images/silver.png" alt="blue verifiation" class="verificationIcon">
        <img 
        v-else
        src="../../public/images/none.png" alt="blue verifiation" class="verificationIcon">
      </h3>
      </div>

      <div>
        {{$store.state.vTiers}}
      </div>
      <div>
        <button>
          {{$store.getters.getVTier("111")}}
        </button>
      </div>

      <!-- <div class="tooltip">@{{ freet.author }}
        <span class="tooltiptext">User Information: &#013; Fritter Fame: {{this.fame}} Follow
          <div class = "tooltip"> testing
            <span class="tooltiptext">woohoo
            </span>
          </div>
        </span>
      </div>  -->

      <div>
        <span
          v-if="fameVisible"
        >
          {{freet.author}}'s Fritter Fame: {{this.fame}}
        </span>
        <button 
          v-if="fameVisible"
          class="link2"
          @click="hideFame"
          >
          Hide Fame
        </button>
        <button 
          v-else
          class="link"
          @click="updateAndShowFame(freet.author)"
          >
          Show Fame
        </button>
        
      </div>

      <!-- <p class="info">
      <button @click="viewFreet">
          View Fame 
        </button>
      </p> -->
      <div
        v-if="$store.state.username === freet.author"
        class="actions"
      >
        <button
          v-if="editing"
          @click="submitEdit"
        >
          ✅ Save changes
        </button>
        <button
          v-if="editing"
          @click="stopEditing"
        >
          🚫 Discard changes
        </button>
        <button
          v-if="!editing"
          @click="startEditing"
        >
          ✏️ Edit
        </button>
        <button @click="deleteFreet">
          🗑️ Delete
        </button>
      </div>
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p
      v-else
      class="content"
    >
      {{ freet.content }}
    </p>
    <p class="info">
      Posted at {{ freet.dateModified }}
      <i v-if="freet.edited">(edited)</i>
    </p>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {}, // Displays success/error messages encountered during freet modification
      fameVisible: false, 
      fame: 0,
      vTier: "none"
    };
  }, 
  // computed/\
  // life cycle hooks
  methods: {
    viewFame(){
      const params = {
        method: 'GET'
      }
      this.request(params);
    },
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.freet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error = 'Error: Edited freet content should be different than current freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited freet!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    printConsole() {
      console.log("working!");
    },
    showFame() {
      this.fameVisible=true;
    },
    hideFame() {
      this.fameVisible=false;
    },
    async updateAndShowFame(author){
      const options = {
        method: 'GET', headers: {'Content-Type': 'application/json'}
      };
      try {
        const userInfoUrl = `/api/users/${author}`;
        const userInfo = await fetch(userInfoUrl).then(async r => r.json());
        try {
          const fame = await fetch(`/api/fame/${userInfo.user._id}`, options).then((r) => r.json());
          this.fame = fame.fame;
          this.$store.commit('refreshFreets');
          this.fameVisible=true;
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async updateFame(author){
      const options = {
        method: 'GET', headers: {'Content-Type': 'application/json'}
      };
      try {
        const userInfoUrl = `/api/users/${author}`;
        const userInfo = await fetch(userInfoUrl).then(async r => r.json());
        try {
          const fame = await fetch(`/api/fame/${userInfo.user._id}`, options).then((r) => r.json());
          this.fame = fame.fame;
          this.$store.commit('refreshFreets');
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
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
.freet {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

button.link {background-color: #04AA6D;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  border-radius: 20%;
}

button.link2 {background-color: #808080;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 4px 2px;
  border-radius: 20%;
}

.u1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
}

img.verificationIcon{
  width: 30px;
  height: 100%;
}
</style>
