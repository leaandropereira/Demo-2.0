
                    function processtumulos(json, lyr){
                    var att = json.properties;
                    lyr.bindTooltip('N° ' + '<b>'+att.numero+'</b>');
                    artumulosids.push(att.numero.toString());  
                    artumulosnames.push(att.nome_prop.toString());       
                    artumulos_faleicdos.push(att.falecidos_1.toString());
                    artumulos_faleicdos2.push(att.falecidos_2.toString());
                    search = [...artumulosids, ...artumulosnames, ...artumulos_faleicdos, ...artumulos_faleicdos2];
                    //console.log(search);
                    };
                   
                    function filtertumulos(json){
                        var artumulosfilters = [];
                        $("input[name=filtertumulos]").each(function(){
                            if(this.checked){
                                artumulosfilters.push(this.value);
                            }
                            
                        });
                        var att = json.properties;
                        switch(att.cod_prop){
                            case 0:
                                    return (artumulosfilters.indexOf('0')>=0);
                                    break;
                            case 1:
                                    return (artumulosfilters.indexOf('1')>=0); 
                                    break;
                            default:
                                    return (artumulosfilters.indexOf('3')>=0); 
                                    break;
                        }
                            
                    };

                    function returnTumulobyid(id){
                        var artumulos = tumulos.getLayers();
                        for (i=0;i<artumulos.length-1;i++){
                            
                            var featureID0 = artumulos[i].feature.properties.numero;
                            var featureID1 = artumulos[i].feature.properties.nome_prop;
                            var featureID2 = artumulos[i].feature.properties.falecidos_1;
                            var featureID3 = artumulos[i].feature.properties.falecidos_2;
                            //console.log(featureID);
                            if (featureID0 == id || featureID1 == id || featureID2 == id || featureID3 == id){
                                return artumulos[i];
                           }
                            
                        }
                        return false;
                    }
            
                    $("#btnfindtumulo").click(function(){
                        //alert('hello');
                        var id = $("#txtfindtumulo").val();
                        var lyr = returnTumulobyid(id);
                        if (lyr){
                            if (lyrSearch){
                                lyrSearch.remove();
                                
                            }
                            
                            lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style:{color:'red'}}).addTo(mymap);  
                            
                            //mymap.fitBounds(lyr.ge"tBounds().pad(1), {'duration':5000.25});
                            //markertum = L.marker(lyr.getCenter()).addTo(mymap);
                            
                            mymap.flyTo(lyr.getCenter(), 23, {
                              animate: true,
                              duration: 1.0
                            });
                                                      
                            var att = lyr.feature.properties;
                            var popup = '<div id=pop>'+'Proprietário: '+ '<b>'+att.nome_prop+'</b>'+'<br>'+
                            'Código: ' + att.cod_prop+ '<br>'+'Número do Túmulo: '+att.numero+ 
                            '<table class="table table-striped"><tr> <th>Falecidos</th>     <th>Data</th></tr>   <tr>     <td>'+att.falecidos_1+'</td>     <td>'+att.data_1+'</td></tr>   <tr>     <td>'+att.falecidos_2+'</td>     <td>'+att.data_2+'</td></tr> </table>'+'</div>'+'<img id="img2" src="img/foto1.png">';
                            $("#divtumulosdata").html(popup);
                            $("#divtumuloError").html("");
                        }else {
                            $("#divtumuloError").html("***** N° Tumulo não encontrado *****");
                            $("#divtumulosdata").html("");
                            lyrSearch.remove();
                        }
                    });
                    $("#btnclear").click(function(){
                        
                        $("#divtumulosdata").html("");
                        if (lyrSearch){
                                lyrSearch.remove();
                        };
                        $("#txtfindtumulo").val('');
                        $("#divtumuloError").html("");
                    });

                    ///***** Funções dos Filtros
                    $("#btnfilter").click(function(){
                        artumulosids=[];
                        tumulos.refresh();                
                    });
                        