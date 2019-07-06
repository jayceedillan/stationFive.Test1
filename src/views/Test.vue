<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-radio-group
              v-model="selFirstGroup"
              column
              v-for="(n, index) in firstGroup"
              :key="index"
            >
              <v-radio
                @change="getValueFirstGroup(n)"
                :label="n.value"
                color="n.value"
                :value="n.value"
              ></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs12 sm4 md4>
            <v-radio-group
              v-model="secondFirstGroup"
              column
              v-for="(n, index) in secondGroup"
              :key="index"
            >
              <v-radio
                @change="getValueSecondGroup(n.id)"
                :label="n.value"
                color="n.value"
                :value="n.value"
                :disabled="n.disabled == true"
              ></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs12 sm4 md4>
            <v-radio-group
              v-model="thirdFirstGroup"
              column
              v-for="(n, index) in thirdGroup"
              :key="index"
            >
              <v-radio
                @change="getValueThirdGroup(n.id)"
                :label="n.value"
                color="n.value"
                :value="n.value"
                :disabled="n.disabled == true"
              ></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-flex xs12 sm12 text-xs-center>
      <div>
        <v-btn
          @click="showOrder"
          large
          color="primary"
          :disabled="selectedFirstGroup ==='' || secondFirstGroup==='' || selectedThirdGroup ===''"
        >Valid Order</v-btn>
      </div>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selFirstGroup: "",
      selectedFirstGroup: "",
      secondFirstGroup: "",
      selectedThirdGroup: "",
      secondSelectedGroup: 0,
      thirdFirstGroup: "",
      isValid: false,
      firstGroup: [
        { id: "101", value: "Vegetarian" },
        { id: "102", value: "Nut allergy" },
        { id: "103", value: "Halal" }
      ],
      secondGroup: [
        { id: "201", value: "Cashew chicken" },
        { id: "202", value: "Sweet and sour pork" },
        { id: "203", value: "Stir fried Tofu" },
        { id: "204", value: "Vegetable fried rice" },
        { id: "205", value: "Pad Thai" },
        { id: "206", value: "Massaman beef" }
      ],
      thirdGroup: [
        { id: "301", value: "Peanut sauce" },
        { id: "302", value: "Oyster sauce" },
        { id: "303", value: "Vegetable spring rolls" },
        { id: "304", value: "Steamed rice" }
      ]
    };
  },
  methods: {
    getValueFirstGroup(selected) {
      this.selectedFirstGroup = selected;
      this.secondFirstGroup = "";
      this.thirdFirstGroup = "";
      this.resetValueForThird();
      this.secondSelectedGroup = 0;
      let results = this.enabledElement(selected.id);
      this.resetValue();

      for (const addRow of results) {
        addRow.disabled = true;
      }
    },
    resetValue() {
      for (const addRow of this.secondGroup) {
        addRow.disabled = false;
      }
    },
    resetValueForThird() {
      for (const addRow of this.thirdGroup) {
        addRow.disabled = false;

        if (
          this.secondSelectedGroup === "304" ||
          this.secondSelectedGroup === "302"
        ) {
          addRow.disabled = true;
        }

        if (this.selectedFirstGroup.id === "101" && addRow.id === "302") {
          addRow.disabled = true;
        }
      }
    },

    getValueSecondGroup(selected) {
      this.secondSelectedGroup = selected;
      this.thirdFirstGroup = "";
      this.resetValueForThird();
      if (selected === "204" || selected === "205") {
        let resThirdGroup = this.thirdGroup.filter(function(items) {
          return items.id == "304";
        });
        this.addRowForThird(resThirdGroup);
      }
    },

    getValueThirdGroup(selected) {
      this.selectedThirdGroup = selected;
    },
    enabledElement(id) {
      debugger;
      switch (id) {
        case "101":
          return this.processVegetarian();
        case "102":
          return this.processNutAllergy();
        case "103":
          return this.processHalal();
      }
    },

    processVegetarian() {
      let results = this.secondGroup.filter(function(items) {
        return items.id == "201" || items.id == "202" || items.id == "206";
      });

      let resThirdGroup = this.thirdGroup.filter(function(items) {
        return items.id == "302";
      });
      this.addRowForThird(resThirdGroup);

      return results;
    },
    processNutAllergy() {
      let results = this.secondGroup.filter(function(items) {
        return items.id == "201";
      });

      let resThirdGroup = this.thirdGroup.filter(function(items) {
        return items.id == "301";
      });
      this.addRowForThird(resThirdGroup);

      return results;
    },
    processHalal() {
      return this.secondGroup.filter(function(items) {
        return items.id == "202";
      });
    },
    addRowForThird(results) {
      for (const addRow of results) {
        addRow.disabled = true;
      }
    },

    showOrder() {
      this.$snotify.remove();
      this.$snotify.success("Please wait for your order...", "Valid");
    }
  }
};
</script>