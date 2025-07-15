import React,{ useEffect } from 'react'

interface DetectOutsideProps<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  callback: () => void;
}

function useDetectOutside<T extends HTMLElement>({ ref, callback }: DetectOutsideProps<T>) {
    useEffect(()=> {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)){
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return() => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[ref, callback]);
  
}

export default useDetectOutside