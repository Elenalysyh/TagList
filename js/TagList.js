'use strict';

(function(){	
	var ListOfAllTag=[];
    function TagList(ParendNode,OriginalTags){
    	
    	this.View;
		this.ParendNode = ParendNode;
    	this.structure = this.CreatDomForTagList();
		$(ParendNode).append(this.structure);
		this.currentTag = this.SaveTag();
		this.closeT = this.DeleteTag();
		this.ButtonShow=$(".BtnEditAndView");
		this.ButtonShow.on('click', this.EditOrView);
    }

	TagList.prototype.CreatDomForTagList = function() {
		var divForWrapper = $('<div class="wrapper">'+
							 '<button class="BtnEditAndView">Просмотр</button>'+
							 '<div class="ContainerForTag"> </div>'+
							 '<input id="FieldForEnter" type="text" placeholder="Введите тег"></input>'+
							 '<button class="BtnCreate" type="submit" disabled = "disabled">Добавить</button>'+
							 '</div>');
		  	return divForWrapper;
	}

	TagList.prototype.SaveTag = function() {
		var field = $('#FieldForEnter');
		var BtnCreate = $(".BtnCreate");
		var container = $(".ContainerForTag");

		 $(BtnCreate).on('click', function() {
				 	var contentTag=field.val();
		            var newTag = $('<p class="wrapperTag label label-default">'+
		            			   '<span class="Tag">'+contentTag+'</span>'+
		            			    '<span class="closeTag">Х</span>'+'</p>');
				    if (ListOfAllTag.indexOf(contentTag)== -1&&ListOfAllTag.indexOf(" "+contentTag)== -1&&contentTag!="" ) {
		          $(container).append(newTag);
		          ListOfAllTag.push(contentTag);
		          ListOfAllTag.push(" "+contentTag);
		          ListOfAllTag.push(contentTag+" ");
		          $('input').val('');
		          console.log('ListOfAllTag 1',ListOfAllTag);
		          }
		 });

		 $(document).on('keyup', function(event) {
		 	if(field.is(":focus")){
                if (event.keyCode == 13){    
					var contentTag=field.val();
		            var newTag =$('<p class="wrapperTag label label-default">'+
		            			   '<span class="Tag">'+contentTag+'</span>'+
		            			    '<span class="closeTag">Х</span>'+'</p>');
				    if (ListOfAllTag.indexOf(contentTag)== -1) {
		            $(container).append(newTag);
		            ListOfAllTag.push(contentTag);
		            $('input').val('');
		            }
		 		}
		 	}
         });
	}

	TagList.prototype.DeleteTag = function() {
			 $(".ContainerForTag").on('click' , '.closeTag' ,function(event) {	  
		 	var closeElement = $(this).parent(".wrapperTag");
              console.log(closeElement);
          $(closeElement).remove();

      
        } )
	}

	TagList.prototype.EditOrView= function() {
		var ShowCloseElem=$('.closeTag');
		console.log(ShowCloseElem);
		if(this.View==true) {
			this.View=false;	
				$(ShowCloseElem).css("display", "none");
				$(".BtnCreate").prop("disabled", true); // - блокировка элемента с id=myInput
				$(this).text('Просмотр');
		}else{
			this.View=true;
			$(ShowCloseElem).css("display", "inline");
			$(".BtnCreate").prop("disabled", false);
			$(this).text('Редактировать');
		}
			
	}

      window.TagList =TagList;
}());