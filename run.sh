#/bin/bash

function choose_from_menu() {
    local prompt="$1" outvar="$2"
    shift
    shift
    local options=("$@") cur=0 count=${#options[@]} index=0
    local esc=$(echo -en "\e") # cache ESC as test doesn't allow esc codes
    printf "$prompt\n"
    while true
    do
        # list all options (option list is zero-based)
        index=0 
        for o in "${options[@]}"
        do
            if [ "$index" == "$cur" ]
            then echo -e " >\e[7m$o\e[0m" # mark & highlight the current option
            else echo "  $o"
            fi
            index=$(( $index + 1 ))
        done
        read -s -n3 key # wait for user to key in arrows or ENTER
        if [[ $key == $esc[A ]] # up arrow
        then cur=$(( $cur - 1 ))
            [ "$cur" -lt 0 ] && cur=0
        elif [[ $key == $esc[B ]] # down arrow
        then cur=$(( $cur + 1 ))
            [ "$cur" -ge $count ] && cur=$(( $count - 1 ))
        elif [[ $key == "" ]] # nothing, i.e the read delimiter - ENTER
        then break
        fi
        echo -en "\e[${count}A" # go up to the beginning to re-render
    done
    # export the selection to the requested output variable
    printf -v $outvar "${options[$cur]}"
}


selections=(
"Quit"
"Deploy Lambda API #1"
"Deploy and sync static S3"
"Selection C"
)


while [ "$selected_choice" != "Quit" ]; do

    choose_from_menu "Please make a choice:" selected_choice "${selections[@]}"

    if [ "$selected_choice" = "Quit" ]; then 

        read -n 1 -p "Exit? (any_key / n) " ans;
        case $ans in 
            n|N)
                echo \ 
                selected_choice=""
                ;;
            *)
                exit
                ;;
        esac
    
    else

        echo "...start $selected_choice"
        case $selected_choice in
            "Deploy Lambda API #1")
                cd lambda-api
                ./deploy.sh
                cd ..
                ;;
            "Deploy and sync static S3")
                cd static-hosting
                ./deploy.sh
                cd ..
                ;;
            "Selection C")
                echo "you chose choice $selected_choice which is $selected_choice"
                ;;
            "Quit")
                exit
                ;;
            *) echo "invalid option $selected_choice";;
        esac

    fi

done