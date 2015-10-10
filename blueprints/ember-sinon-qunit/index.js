module.exports = {
  description: 'Integrate ember-sinon with ember-qunit',
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function () {
    this.addAddonToProjecT('ember-sinon');
  }
};
