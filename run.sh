#/bin/bash

# abort on errors
set -e

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
"Build and deploy frontend (without pic)"
"Deploy and sync pictures"
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
            "Build and deploy frontend (without pic)")
                cd stalingrad-ecomm
                #clear already exist build dir
                if [ -d "./out/" ]; then
                    rm -rf out
                fi
                npm run build
                cd ../static-hosting
                ./deploy-frontend.sh
                echo "frontend app has deployed (without frontend pictures)"
                cd ../stalingrad-ecomm
                if [ -d "./out/" ]; then
                    rm -rf out
                fi
                echo "out directory is removed"
                cd ..
                ;;
            "Deploy and sync pictures")
                cd static-hosting
                ./deploy-pictures.sh
                echo "pictures for frontend app have deployed"
                cd ..
                ;;
            "Quit")
                exit
                ;;
            *) echo "invalid option $selected_choice";;
        esac

    fi

done