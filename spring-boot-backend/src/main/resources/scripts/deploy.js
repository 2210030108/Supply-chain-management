async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const SupplierContract = await ethers.getContractFactory("SupplierContract");
    const supplierContract = await SupplierContract.deploy();
    console.log("SupplierContract deployed to:", supplierContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
