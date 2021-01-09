<template>
  <article>
    <details class="icon main-icon">
      <summary id="info"
        ><font-awesome-icon id="info__icon" icon="info"
      /></summary>
      <p id="tooltip">
        Remember: Scissors beat paper beats rock beats scissors!
      </p>
    </details>
    <div id="rock" class="icon main-icon">
      <font-awesome-icon icon="hand-rock" />
    </div>
    <div id="angle1" class="icon angle">
      <font-awesome-icon icon="angle-right" />
    </div>
    <div id="scissors" class="icon main-icon">
      <font-awesome-icon icon="hand-scissors" rotation="90" />
    </div>
    <div id="angle2" class="icon angle">
      <font-awesome-icon icon="angle-right" />
    </div>
    <div id="paper" class="icon main-icon">
      <font-awesome-icon icon="hand-paper" />
    </div>
    <div id="angle3" class="icon angle">
      <font-awesome-icon icon="angle-right" />
    </div>
  </article>
</template>

<script>
export default {
  name: "rules-graph",
};
</script>

<style lang="scss" scoped>
/// Mixin to place items on a circle
/// @author Hugo Giraudel
/// @author Ana Tudor
/// @param {Integer} $item-count - Number of items on the circle
/// @param {Length} $circle-size - Large circle size
/// @param {Length} $item-size - Single item size
@mixin on-circle($item-count, $circle-size, $item-size) {
  position: relative;
  width: $circle-size;
  height: $circle-size;
  padding: 0;
  border-radius: 50%;
  list-style: none;

  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: $item-size;
    height: $item-size;
    margin: -($item-size / 2);
  }
}

.icon {
  font-size: 3rem;
  width: 3em;
  height: 3em;
  display: grid !important;
  place-items: center;
  > * {
    display: inline-block;
  }
}

#info {
  position: relative;
  display: inline-block;
  height: 100%;
  display: grid !important;
  place-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.15s background linear;

  &:hover,
  &:focus {
    background: #d4d1ec;
  }

  #info__icon {
    font-size: 2rem;
  }
}
#tooltip {
  font-size: 1.5rem;
  z-index: 1;
  cursor: auto;
  background-color: #eee;
  padding: 15px;
  width: 250px;
  position: absolute;
  left: 0;
  top: 90px;
  border-radius: 4px;
  right: 0;
  // Tiny triangle that points up
  &:before {
    content: "";
    border-bottom: 12px solid #eee;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    height: 0;
    left: 10px;
    position: absolute;
    top: -10px;
    width: 0;
  }
}
#rock {
  transform: rotate(0deg) translate(7rem) rotate(0deg);
}
#angle1 {
  transform: rotate(60deg) translate(7.5rem) rotate(100deg);
}
#scissors {
  transform: rotate(120deg) translate(6.5rem) rotate(-120deg);
}
#angle2 {
  transform: rotate(180deg) translate(7.4rem) rotate(-265deg);
}
#paper {
  transform: rotate(240deg) translate(8rem) rotate(-240deg);
}
#angle3 {
  transform: rotate(300deg) translate(7.4rem) rotate(-270deg);
}

#rules-graph {
  @include on-circle($item-count: 6, $circle-size: 15rem, $item-size: 5rem);
  border: solid 5px tomato;
}
</style>
