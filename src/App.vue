<template>
  <SidebarProvider :default-open="false">
    <AppSidebar />
    <main class="flex flex-col items-center justify-center h-screen w-full">
      <Countdown class="w-sm" >
        <template #header>
          <SidebarTrigger />
        </template>
      </Countdown>
    </main>
  </SidebarProvider>
</template>
<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Countdown from '@/views/Countdown.vue';
</script>
