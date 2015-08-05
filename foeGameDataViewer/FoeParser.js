// ------------------------
// Author: peter.hozak@gmail.com
// Version: 0.1.2
// Date: 2014-01-19
// Description: proof of concept for parsing data that were sent unencrypted to my game client - http://sk.forgeofempires.com
// ------------------------
var FoeParser = (function ($){
    'use strict';
    
    // private helper functions
    // ------------------------
    Object.prototype.keys = function (){
        return Object.getOwnPropertyNames(this);
    };
    
    function log(msg){
        $('#dump').append(msg + '\n');
    }
    
    function skeleton(obj){
        switch ($.type(obj)) {
            case 'object':
                $.each(obj, function(index, value){
                    obj[index] = skeleton(value);
                });
                return obj;
                break;
            case 'array':
                return [skeleton(obj[0])];
                break;
            default:
                return obj;
        };
    }
    
    function flatten(obj, out){
        out = out || {};
        function doIt(obj, prefix){
            switch ($.type(obj)) {
                case 'array':
                    $.each(obj, function(index, value){
                        doIt(value, prefix + '.[]');
                    });
                    return;
                case 'object':
                    $.each(obj, function(index, value){
                        if (index !== '__class__'){
                            doIt(value, prefix + '.' + index);
                        };
                    });
                    return;
                default:
                    if (out[prefix]){
                        out[prefix].push(obj);
                        // out[prefix][1] += 1;
                    } else {
                        out[prefix] = [obj];
                        // out[prefix] = [obj, 1];
                    };
                    return;
            };
        };
        doIt(obj, '');
        return out;
    }
    
    function build_table(list, propertiesList){
        var table = ['<thead><tr><th>' + propertiesList.join('</th><th>') + '</th></tr></thead>'];
        var csv = [propertiesList.join(',')];
        $.each(list, function(_, item){
            var tableRow = [];
            var csvRow = [];
            item = flatten(item);
            $.each(propertiesList, function(_, property){
                property = '.' + property;
                tableRow.push(item[property] && item[property].join('<br>') || '');
                if ( ! item[property]){
                    csvRow.push('');
                } else if (item[property].length === 1) {
                    csvRow.push(item[property][0]);
                } else {
                    csvRow.push('"' + item[property].join('\n') + '"');
                };
            });
            table.push('<tbody><tr><td>' + tableRow.join('</td><td>') + '</td></tr></tbody>');
            csv.push(csvRow.join(','));
        });
        console.log(csv.join('\n'));
        return table;
    }
    
    // ----------------
    // public interface
    // ----------------
    var FoeParser = {
        parseBuildings: function(obj, propertiesList){
            $('#buildings_toggle').click(function (e) {
                $('#buildings').toggle();
            });
            
            return $('#buildings').html(
                build_table(obj.responseData.city_entities, propertiesList)
            );
        },
        parseClan: function(obj, propertiesList){
            $('#clan_toggle').click(function (e) {
                $('#clan').toggle();
            });
            
            $('#clan').html(
                build_table(obj.responseData.members, propertiesList)
            );
        },
    };
    
    return FoeParser;
    
}( jQuery.noConflict() ));
