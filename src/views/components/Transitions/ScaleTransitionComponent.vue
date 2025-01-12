<template>
  <transition name="scale">
    <slot></slot>
  </transition>
</template>

<style lang="scss">
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
}
</style>
