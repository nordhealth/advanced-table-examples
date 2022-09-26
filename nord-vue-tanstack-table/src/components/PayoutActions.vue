<template>
  <div class="n-table-actions">
    <nord-dropdown position="block-end" align="end" size="s">
      <nord-button slot="toggle" aria-describedby="tooltip" size="s">
        <nord-icon
          name="interface-menu-small"
          color="var(--n-color-icon)"
          label="Open menu"
          size="s"
        ></nord-icon>
      </nord-button>

      <nord-dropdown-group>
        <nord-dropdown-item href="#">View payment details</nord-dropdown-item>
        <nord-dropdown-item>Open in new tab</nord-dropdown-item>
        <nord-dropdown-item>Copy link</nord-dropdown-item>
      </nord-dropdown-group>

      <nord-dropdown-group>
        <nord-dropdown-item>Refund payment</nord-dropdown-item>
        <nord-dropdown-item>
          Delete
          <nord-icon slot="end" name="interface-delete" size="s"></nord-icon>
        </nord-dropdown-item>
      </nord-dropdown-group>
    </nord-dropdown>
  </div>
</template>
