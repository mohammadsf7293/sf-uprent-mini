<script lang="ts">
  import AddressModal from '~ui/components/address-modal'
  let showModal = false
</script>

<button 
  class=".bg-black .text-white .px-4 .py-2 .rounded-md .hover:bg-gray-800 .transition-colors"
  on:click={() => showModal = true}
>
  Manage addresses
</button>

<AddressModal 
  isOpen={showModal}
  on:close={() => showModal = false}
/> 