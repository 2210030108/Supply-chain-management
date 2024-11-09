package com.example.one;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "ethereum.node-url=http://localhost:8545",  // specify Ethereum node URL for tests
    "ethereum.contract.address=0xda2df749BDC73bd6a60a15EA596cd3F31aE84beD",  // contract address for testing
    "ethereum.account.privateKey=8cfaa06ef20dcc384dc674cda939cf26aa34a239a4ebea2b07dcd0a3a094cead"  // private key for testing
})
class SpringBootBackendApplicationTests {

    @Test
    void contextLoads() {
        // The application context should now load without errors
    }
}
