module.export={
    roots:['<rootDir>/tests'],
    // transform:{
    //     '\\.(ts|tsx)?$':'babel-jest'
    // },
    testMatch:['<rootDir>/tests/**/?(*.)test.{js}'],
    moduleFileExtensons:['ts','js','json','node'],
    testPathIgnorePatterns:['/node_modules/'],
    testEnvironment:"jest-environment-jsdom"
    
    // setupFilesAfterEnv:[
    //     'jest-dom/extend-expect',
    //     '@testing-library/react/cleanup-after-each'
    // ]
}