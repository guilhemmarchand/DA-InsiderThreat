/* TODO: jink to replace theme_utils with that from core */
require.config({
  paths: {
    theme_utils: '../app/simple_xml_examples/theme_utils'
  }
});

require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'theme_utils',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView, themeUtils) {

    // Translations from rangemap results to CSS class
    var ICONS = {
        increase: 'arrow-up_red',
        reduction: 'arrow-down_red'
    };

    var RangeMapIconRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the range field
            return cell.field === 'Direction';
        },
        render: function($td, cell) {
            var icon = 'question';
            var isDarkTheme = themeUtils.getCurrentTheme && themeUtils.getCurrentTheme() === 'dark';

            // Fetch the icon for the value
            if (ICONS.hasOwnProperty(cell.value)) {
                icon = ICONS[cell.value];
            }
            // Create the icon element and add it to the table cell
            $td.addClass('icon').html(_.template('<img src="/static/app/DA-InsiderThreat/icon_<%- icon %>.png"/>', {
                icon: icon,
                range: cell.value,
                isDarkTheme: isDarkTheme ? 'dark' : ''
            }));
        }
    });

    mvc.Components.get('table1').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new RangeMapIconRenderer());
    });

});
