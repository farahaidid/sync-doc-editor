<template>
  <div ref="textpropertypane" class="e-de-text-property" id="textpropertypane">
    <textprop></textprop>
    <paragraphprop></paragraphprop>
    </div>
</template>

<script>
import textComp from "@/components/textComp"
import paragraphComp from "@/components/Paragraph"
import bus from "@/mixins/bus"
export default {
  props: ['isShow'],
    watch: {
        isShow: function (newVal, oldVal) {
            this.$refs.textpropertypane.style.display = newVal ? 'block' : 'none';
        },

    },
    mounted() {
        this.$nextTick(function () {
            this.$refs.textpropertypane.style.display = 'none';
        });
    },
    components: {
        'textprop': textComp, 'paragraphprop': paragraphComp
    },
  methods: {
        onSelectionChange: function () {
            textComp.methods.onSelectionChange();
            paragraphComp.methods.onSelectionChange();
        }
    }
}
</script>

<style>

</style>