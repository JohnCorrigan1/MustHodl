pragma solidity >=0.8.0 <0.9.0;

// SPDX-License-Identifier: MIT

contract YourContract {
  struct Stake {
    uint256 amount;
    uint256 unlockTime;
    uint256 fakeEth;
  }

  struct Staker {
    Stake[] stakes;
    uint256 ClaimableRewards;
  }

  mapping(address => Staker) public Stakers;
  uint256 public totalStakedAmount;
  uint256 public accuredFees;
  uint256 public lastDistributionTime;
  uint256 public totalFakeEth;
  address[] public allStakers;

  event StakeEvent(address sender, uint256 amount, uint256 unlockTime);
  event Unstake(address sender, uint256 amount, uint256 fee);

  constructor() payable {}

  function stake(uint256 _unlockTime) public payable {
    require(msg.value > 0, "MustHodl: stake amount must be greater than 0");
    require(_unlockTime > 0, "MustHodl: unlock time must be greater than 0");
    //change 120 to max lock time
    require(_unlockTime <= 120, "MustHodl: max lock time is 120 seconds");
    if (Stakers[msg.sender].stakes.length == 0) {
      allStakers.push(msg.sender);
    }

    //unlock time is seconds locking for 120 seconds will give you 1 to 1 lock
    //change 120 to amount of time for a max lock period
    uint256 fakeEth = (msg.value * _unlockTime) / 120;
    totalFakeEth = totalFakeEth + fakeEth;
    Stakers[msg.sender].stakes.push(Stake(msg.value, block.timestamp + _unlockTime, fakeEth));
    totalStakedAmount = totalStakedAmount + msg.value;

    emit StakeEvent(msg.sender, msg.value, block.timestamp + _unlockTime);
  }

  function unstake(uint256 _index) public {
    require(Stakers[msg.sender].stakes.length > 0, "MustHodl: no stake found");
    require(_index < Stakers[msg.sender].stakes.length, "MustHodl: invalid index");

    Stake memory _stake = Stakers[msg.sender].stakes[_index];

    if (_stake.unlockTime > block.timestamp) {
      uint256 _fee = (_stake.amount / 10);
      accuredFees = accuredFees + _fee;

      (bool sent, ) = msg.sender.call{value: _stake.amount - _fee}("");
      require(sent, "Failed to send Ether");

      totalStakedAmount = totalStakedAmount - _stake.amount;
      totalFakeEth = totalFakeEth - _stake.fakeEth;
      emit Unstake(msg.sender, _stake.amount - _fee, _fee);
      _stake.amount = 0;
    } else {
      (bool sent, ) = msg.sender.call{value: _stake.amount}("");
      require(sent, "Failed to send Ether");

      totalStakedAmount = totalStakedAmount - _stake.amount;
      totalFakeEth = totalFakeEth - _stake.fakeEth;
      emit Unstake(msg.sender, _stake.amount, 0);
      _stake.amount = 0;
    }

    //remove stake from array
    for (uint256 i = _index; i < Stakers[msg.sender].stakes.length - 1; i++) {
      Stakers[msg.sender].stakes[i] = Stakers[msg.sender].stakes[i + 1];
    }
    Stakers[msg.sender].stakes.pop();
  }

  function distributeFees() public {
    require(accuredFees > 0, "MustHodl: no fees to claim");
    require(block.timestamp >= lastDistributionTime + 1 minutes, "MustHodl: distribution time not reached");
    lastDistributionTime = block.timestamp;
    //loop through all stakes and their stakes
    //calculate their share of the fees

    for (uint256 i = 0; i < allStakers.length; i++) {
      uint256 _totalFakeEth;
      for (uint256 j = 0; j < Stakers[allStakers[i]].stakes.length; j++) {
        _totalFakeEth = _totalFakeEth + Stakers[allStakers[i]].stakes[j].fakeEth;
      }
      Stakers[allStakers[i]].ClaimableRewards =
        Stakers[allStakers[i]].ClaimableRewards +
        (accuredFees * _totalFakeEth) /
        totalFakeEth;
    }
    accuredFees = 0;
  }

  function claimFees() public {
    require(Stakers[msg.sender].ClaimableRewards > 0, "MustHodl: no fees to claim");
    uint256 _amount = Stakers[msg.sender].ClaimableRewards;
    Stakers[msg.sender].ClaimableRewards = 0;
    (bool sent, ) = msg.sender.call{value: _amount}("");
    require(sent, "Failed to send Ether");
  }

  function getStakes(address _staker) public view returns (Stake[] memory) {
    return Stakers[_staker].stakes;
  }

  // to support receiving ETH by default
  receive() external payable {}

  fallback() external payable {}
}
