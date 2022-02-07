import React from 'react'
// Type definitions from React
//----------------------------
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
type DispatchWithoutAction = () => void;
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerWithoutAction<S> = (prevState: S) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> =
    R extends ReducerWithoutAction<infer S> ? S : never;
 
export declare  function useStates<T=any>(keyword: string | (() =>any)): [T, Dispatch<SetStateAction<T>>];


export declare  function useReducers<R extends ReducerWithoutAction<any>>(
        reducer: R,
        keyword: string ,
        initializer: (arg: any) => ReducerStateWithoutAction<R>
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
export declare function useReducers<R extends ReducerWithoutAction<any>>(
        reducer: R,
        keyword: string,
        initializer?: undefined
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
export declare function useReducers<R extends Reducer<any, any>>(
        reducer: R,
        keyword: string ,
        initializer: (arg: any) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
   
export declare function useReducers<R extends Reducer<any, any>>(
        reducer: R,
        keyword: string,
        initializer?: undefined
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

interface contextKey{
    [key : string]:any
}
interface ProviderProps{
    context: contextKey;
    children?: React.ReactNode | undefined;
}
export declare const Providers:React.FC<ProviderProps>;
 